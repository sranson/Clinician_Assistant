const { AuthenticationError } = require('apollo-server-express');
const { User, Client } = require('../models');
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
        addClient: async (parent, { firstName, lastName, DOB }, context) => {
                const client = await Client.create({
                    firstName,
                    lastName,
                    DOB,
                });

                await User.findOneAndUpdate(
                    { _id: '6160a0a495818d0a6b0c5b2c' },             
                    { $addToSet: { clients: client._id } }
                );
                return client;
            throw new AuthenticationError('You need to be logged in!');
        },
    }
    
};



module.exports = resolvers;