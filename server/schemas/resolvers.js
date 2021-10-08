const { AuthenticationError } = require('apollo-server-express');
const { User, Client, Goal } = require('../models');
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

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            return { token, user };
        },
        addClient: async (parent, { firstName, lastName, DOB, goals }, context) => {
                const client = await Client.create({
                    firstName,
                    lastName,
                    DOB,
                    goals
                });

                await User.findOneAndUpdate(
                    { _id: '6160a0a495818d0a6b0c5b2c' },             
                    { $addToSet: { clients: client._id } }
                );
                return client;
            throw new AuthenticationError('You need to be logged in!');
        },
        addGoals: async (parent, { goalText }, context) => {
            const goal = await Goal.create({ goalText })
            await Client.findOneAndUpdate(
                { _id: '6160a5fe8c20660b9bd7165c'},
                { $addToSet: { goals: goal._id } }
            );
            return goal;
        },
    }
    
};



module.exports = resolvers;