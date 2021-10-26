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
    firstName: String
    lastName: String
    DOB: String
    insuranceId: String
    payorSource: String
    PCP: PCP
    serviceStartTime: String
    serviceEndTime: String
    POC_start_date: String
    POC_end_date: String
    authStart: String
    authEnd: String
    units: String
    goals: [Goal]
  }

  type PCP {
    _id: ID
    pcpFirstName: String
    pcpLastName: String
    pcpNPI: String
    pcpPhoneNumber: String
    pcpFaxNumber: String
  }

  type Goal {
    _id: ID
    goalText: String
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
      users: [User]
      user(userId: ID!): User
      clients: User
      goals(clientId: ID): Client
      pcps: [PCP]
      me: User
      onePCP(pcpId: ID): PCP
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
        PCP:String
        serviceStartTime: String,
        serviceEndTime: String,
        POC_start_date: String
        POC_end_date: String
        authStart: String
        authEnd: String
        units: String
      ): Client

      addGoals(clientId: ID, goalText: String): Goal

      addPCP(
        pcpFirstName: String!
        pcpLastName: String!
        pcpNPI: String!
        pcpPhoneNumber: String
        pcpFaxNumber: String
      ): PCP
    
      removeClient(clientId: ID!): Client
  }
`;


module.exports = typeDefs;

