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
    pcp: PCP
    serviceStartTime: String
    serviceEndTime: String
    POC_start_date: String
    POC_end_date: String
    goals: [Goal]
  }

  type PCP {
    pcpFirstName: String
    pcpLastName: String
    pcpNPI: String
    pcpPhoneNumber: String
    pcpFaxNumber: String
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
      pcp(pcpId: ID!): PCP
      me: User
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addClient(
        firstName: String!, 
        lastName: String, 
        DOB: String!, 
        insuranceId: String, 
        payorSource: String, 
        serviceStartTime: String,
        serviceEndTime: String,
        POC_start_date: String
        POC_end_date: String
      ): Client
      addPCP(
        pcpFirstName: String!
        pcpLastName: String!
        pcpNPI: String!
        pcpPhoneNumber: String
        pcpFaxNumber: String
      ): PCP
    addGoals(goalText: String!): Goal
  }
`;


module.exports = typeDefs;

