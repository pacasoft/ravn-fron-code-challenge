import { gql } from "apollo-angular";

const GET_USERS = gql`
    query {
        users {
            id
            avatar
            email
            fullName
            type
            createdAt
            updatedAt
        }
    }
`

const GET_PROFILE = gql`
    query {
        profile {
            avatar
            email
            fullName
            id
            type
            createdAt
            updatedAt
        }
    }

`;


export { GET_USERS, GET_PROFILE };