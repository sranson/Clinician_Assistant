const { AuthenticationError } = require('apollo-server-express');
const { User, Client, Goal, PCP } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('clients').populate('goals');
        },
        user: async (parent, { userId }) => {
            const user = await User.findOne({ _id: userId }).populate('clients');
            return user;
        },
        clients: async (parent, { userId }) => {
            const clients = await User.findOne({ _id: userId }).populate('clients');
            return clients;
        },
        goals: async(parent, { clientId }) => {
            const goals = await Client.findOne({ _id: clientId }).populate('goals');
            return goals;
        },
        pcps: async () => {
            return PCP.find({});
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('clients').populate('goals');
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
        addClient: async (parent, {firstName, lastName, DOB, goals, insuranceId, payorSource, PCP, serviceStartTime,serviceEndTime,POC_start_date,POC_end_date}, context) => {
            if (context.user) {
                const client = await Client.create({firstName,lastName,DOB,goals,insuranceId,payorSource,PCP,serviceStartTime,serviceEndTime,POC_start_date,POC_end_date});

                await User.findOneAndUpdate(
                    { _id: context.user._id },             
                    { $addToSet: { clients: client._id } }
                );
                return client;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addGoals: async (parent, { clientId, goalText }, context) => {
            const newGoal = await Goal.create({ goalText });

            await Client.findOneAndUpdate(
                { _id: clientId },
                { $addToSet: { goals: newGoal } }
            );
            return newGoal;

        },
        addPCP: async (parent, { pcpFirstName,pcpLastName,pcpNPI,pcpPhoneNumber,pcpFaxNumber }, context) => {
            const newPCP = await PCP.create({ pcpFirstName,pcpLastName,pcpNPI,pcpPhoneNumber,pcpFaxNumber });
            return newPCP;
        },
        removeClient: async (parent, { clientId }, context) => {
            if (context.user) {
                const client = await Client.findOneAndDelete({
                _id: clientId
            });
                await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { clients: clientId } }
            );

                return client;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
    
};



module.exports = resolvers;