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

