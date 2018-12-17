const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// For the GraphQL API, we define its _schema_ (types and graph hierarchy)
// separately from the _resolvers_ (which are functions that are used to resolve that node of the graph when it is queried)
const typeDefs = gql`
  # Query is conventionally the root type of the GraphQL schema
  type Query { 
    hello: String
    # [] = array type
    people: [Human]
    kamsRepos: [String]
    arguments(echo: String) : String
  }

  # This is a child type with typed structure
  type Human {
    first: String!
    last: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return 'Hello world!';
    },
    
    people: () => [
      { first: 'Christoph', last: 'Saxe' },
      { first: 'Dan', last: 'Manchester' }, 
      { first: 'Petra', last: 'Gregorova' }
    ],
    
    kamsRepos: () => fetch('https://api.github.com/users/kamsar/repos')
      .then(res => res.json())
      .then(json => json.map(repo => repo.name)),
    
    arguments: (root, args, context) => args.echo
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});