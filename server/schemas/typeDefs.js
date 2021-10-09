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
    DOB: String!
    insuranceId: String
    payorSource: String
    pcpFirstName: String
    pcpLastName: String
    pcpNPI: String
    pcpPhoneNumber: String
    pcpFaxNumber: String
    goals: [Goal]
  }

  type Goal {
    _id: ID
    goalText: String!
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
    addClient(firstName: String!, lastName: String, DOB: String!, insuranceId: String, payorSource: String, pcpFirstName: String, pcpLastName: String, pcpNPI: String, pcpPhoneNumber: String, pcpFaxNumber: String): Client
    addGoals(goalText: String!): Goal
  }
`;


module.exports = typeDefs;

