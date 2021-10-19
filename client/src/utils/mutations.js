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
    $firstName: String!, $lastName: String!, $DOB: String!, $insuranceId: String, $payorSource: String, 
    $PCP: String,$serviceStartTime: String, $serviceEndTime: String, $POC_start_date: String, $POC_end_date: String, $authStart: String, $authEnd: String, $units: String
  )
      {addClient(firstName: $firstName, lastName: $lastName, DOB: $DOB, insuranceId: $insuranceId, payorSource: $payorSource, 
        PCP: $PCP, serviceStartTime: $serviceStartTime, serviceEndTime: $serviceEndTime, POC_start_date: $POC_start_date, POC_end_date: $POC_end_date, units: $units
        authStart: $authStart, authEnd: $authEnd) {
      _id
      firstName
      lastName
      DOB
      insuranceId
      payorSource
      PCP {
        _id
      }
      serviceStartTime
      serviceEndTime
      POC_start_date
      POC_end_date
      authStart
      authEnd
      units
    }
  }
`

export const ADD_PCP = gql`
  mutation addPCP($pcpFirstName:String!, $pcpLastName: String!, $pcpNPI: String!, $pcpPhoneNumber:String, $pcpFaxNumber: String) {
    addPCP(pcpFirstName: $pcpFirstName, pcpLastName: $pcpLastName, pcpNPI: $pcpNPI, pcpPhoneNumber: $pcpPhoneNumber, pcpFaxNumber: $pcpFaxNumber) {
      _id
      pcpFirstName
      pcpLastName
      pcpNPI
      pcpPhoneNumber
      pcpFaxNumber
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($clientId: ID!, $goalText: String!) {
    addGoals(clientId: $clientId, goalText:$goalText) {
      _id
      goalText
    }
  }
`


export const REMOVE_CLIENT = gql`
  mutation removeClient($clientId:ID!) {
    removeClient(clientId:$clientId) {
    _id
    firstName
    lastName
    }
  }
`;