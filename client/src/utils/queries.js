import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me{
      _id
      username
      email
      clients {
        firstName
        lastName
        DOB
        goals {
          _id
          goalText
        }
      }
    }
  }
`

export const QUERY_ALL_PCPS = gql`
  query pcps{
    pcps{
      _id
      pcpFirstName
      pcpLastName
      pcpNPI
      pcpPhoneNumber
      pcpFaxNumber
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId:ID!) {
    user(userId:$userId) {
      _id
      username
      email
      password
      clients {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_THERAPIST_CLIENTS = gql`
  query therapistClients($userId:ID!) {
    clients(userId:$userId) {
      clients {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_CLIENT_GOALS = gql`
  query clientGoals($clientId:ID) {
    goals(clientId:$clientId) {
      _id
      firstName
      lastName
      goals {
        _id
        goalText
      }
    }
  }
`;