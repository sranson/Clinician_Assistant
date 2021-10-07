const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    clients: [Client]!
  }

  type Client {
    _id: ID
    firstName: String!
    lastName: String!
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
      users: [User]
      user(username: String!): User
      clients(username: String!): [Client]
      client(clientId: ID!): Client
      me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addClient(firstName: String!, lastName: String): Client
  }
`;


module.exports = typeDefs;