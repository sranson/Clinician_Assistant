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
query allPCPs{
  pcps{
    pcpFirstName
    pcpLastName
    pcpNPI
    pcpPhoneNumber
    pcpFaxNumber
  }
}
`;
