const { AuthenticationError } = require('apollo-server-express');
const { User, Client, Goal, PCP } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('clients');
        },
        user: async (parent, { username }) => {
            return Client.findOne({ username }).populate('clients');
        },
        clients: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Client.find(params)
        },
        client: async (parent, { clientId }) => {
            return Client.findOne({ _id: clientId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('clients');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addClient: async (parent, {firstName, lastName, DOB, goals, insuranceId, payorSource, serviceStartTime,serviceEndTime,POC_start_date,POC_end_date}, context) => {
            if (context.user) {
                const client = await Client.create({firstName,lastName,DOB,goals,insuranceId,payorSource,serviceStartTime,serviceEndTime,POC_start_date,POC_end_date});

                await User.findOneAndUpdate(
                    { _id: context.user._id },             
                    { $addToSet: { clients: client._id } }
                );
                return client;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addPCP: async (parent, { pcpFirstName,pcpLastName,pcpNPI,pcpPhoneNumber,pcpFaxNumber }, context) => {
            const newPCP = await PCP.create({ pcpFirstName,pcpLastName,pcpNPI,pcpPhoneNumber,pcpFaxNumber });
            return newPCP;
        },
        addGoals: async (parent, { goalText }, context) => {
            if (context.user) {
                const goal = await Goal.create({ goalText })
                await Client.findOneAndUpdate(
                    { _id: goal._id },
                    { $addToSet: { goals: goal._id } }
                );
                return goal;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
    
};



module.exports = resolvers;