import { ApolloServer, UserInputError, gql } from 'apollo-server'
import {v1 as uuid} from 'uuid'

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
    type Address {
        street: String!
        city: String!
    }
    type Person {
        name: String!
        phone: String
        address: Address!               
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson (name: String!): Person
    }
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        } 
    },
    Mutation: {
        addPerson: (root, args) => {
            if (persons.find(p => p.name === args.name)){{
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name
                })
            }}
            // const {name, phone, street, city} = args
            const person = {...args, id: uuid()}
            persons.push(person)
            return person // update database with new person
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }    
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})