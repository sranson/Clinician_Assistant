import { gql } from '@apollo/client';



export const ADD_USER = gql`
mutation addUser($username:String!, $email:String!, $password:String!) {
  addUser(username: $username, email:$email, password:$password) {
    user {
      _id
      username
      email
      password
    }
  }
}
`


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`

export const ADD_CLIENT = gql`
mutation addClient($firstName: String!, $lastName: String!, $DOB: String!) {
  addClient(firstName: $firstName, lastName: $lastName, DOB: $DOB) {
    _id
    firstName
    lastName
    DOB
  }
}
`

export const ADD_GOAL = gql`
mutation addGoal($goalText: String!) {
  addGoals(goalText:$goalText) {
    _id
    goalText
  }
}
`