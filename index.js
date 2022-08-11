import { ApolloServer, gql } from 'apollo-server'

const persons = [
    {
        name: "Yorch",
        phone: "666554455",
        street: "Calle Frontend",
        city: "Ibiza",
        id: "1"
    },
    {
        name: "Savitar",
        phone: "666553322",
        street: "Calle Nmap",
        city: "Tenerife",
        id: "2"
    },
    {
        name: "Manz",
        phone: "666665544",
        street: "Calle Backend",
        city: "Valencia",
        id: "3"
    },
]

const typeDefinitions = gql`
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})