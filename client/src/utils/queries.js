import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      clients {
        _id
        firstName
        lastName
        DOB
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

export const QUERY_CLIENT_PCP = gql`
query clientPCP($clientId: ID, $pcpId:ID) {
  clientPCP(clientId: $clientId, pcpId: $pcpId) {
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
  query therapistClients{
    clients{
      clients {
        _id
        firstName
        lastName
        DOB
        insuranceId
        payorSource
        serviceStartTime
        serviceEndTime
        POC_start_date
        POC_end_date
        authStart
        authEnd
        units
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



export const QUERY_SINGLE_PCP = gql`
  query onePCP($pcpId: ID) {
    onePCP(pcpId: $pcpId) {
      _id
      pcpFirstName
      pcpLastName
      pcpNPI
      pcpPhoneNumber
      pcpFaxNumber
    }
  }
`;