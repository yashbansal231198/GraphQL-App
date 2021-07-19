import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

const typeDefs = gql`
  extend type Pet {
    vacinated: Boolean!
  }
`;

const resolvers = {
  Pet: {
    vacinated: () => true
  }
};


const cache = new InMemoryCache({
  typePolicies: {
    Pet: {
      keyFields: ["cid"],
    },
    }});
const http = new HttpLink({
  uri: 'http://localhost:4000/'
})

const link = ApolloLink.from([
  http
])

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
})

export default client
