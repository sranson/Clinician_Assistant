import { gql } from '@apollo/client';



export const ADD_USER = gql`
mutation addUser($username:String!, $email:String!, $password:String!) {
  addUser(username: $username, email:$email, password:$password) {
    token
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
mutation addClient(
  $firstName: String!, 
  $lastName: String!, 
  $DOB: String!, 
  $insuranceId: String, 
  $payorSource: String, 
  $serviceStartTime: String,
  $serviceEndTime: String,
  $POC_start_date: String
  $POC_end_date: String,)
    {addClient
      (
      firstName: $firstName, 
      lastName: $lastName, 
      DOB: $DOB, 
      insuranceId: $insuranceId, 
      payorSource: $payorSource, 
      serviceStartTime: $serviceStartTime,
      serviceEndTime: $serviceEndTime,
      POC_start_date: $POC_start_date,
      POC_end_date: $POC_end_date
      ) 
    {
    _id
    firstName
    lastName
    DOB
    insuranceId
    payorSource
    serviceStartTime,
    serviceEndTime,
    POC_start_date,
    POC_end_date
  }
}
`

export const ADD_PCP = gql`
mutation addPCP($pcpFirstName:String!, $pcpLastName: String!, $pcpNPI: String!, $pcpPhoneNumber:String, $pcpFaxNumber: String) {
  addPCP(pcpFirstName: $pcpFirstName, pcpLastName: $pcpLastName, pcpNPI: $pcpNPI, pcpPhoneNumber: $pcpPhoneNumber, pcpFaxNumber: $pcpFaxNumber) {
    pcpFirstName
    pcpLastName
    pcpNPI
    pcpPhoneNumber
    pcpFaxNumber
  }
}
`;

export const ADD_GOAL = gql`
mutation addGoal($goalText: String!) {
  addGoals(goalText:$goalText) {
    _id
    goalText
  }
}
`