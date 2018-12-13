// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Notes,
  Link,
  ComponentPlayground
} from 'spectacle';

import GraphiQL from 'graphiql';
import './styles.css';
import 'graphiql/graphiql.css';

// init apollo
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const GQL_SWAPI = 'https://api.graphcms.com/simple/v1/swapi';

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const apolloClient = new ApolloClient({ uri: GQL_SWAPI });

const graphiQLFetcher = params => fetch(GQL_SWAPI, {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
  credentials: 'include',
}).then(function (response) {
  return response.text();
}).then(function (responseBody) {
  try {
    return JSON.parse(responseBody);
  } catch (error) {
    return responseBody;
  }
});

const initialQuery = `# Star Wars GraphQL Schema
{
  Film(title: "The Force Awakens") {
    title
  }
}
`;

const apolloBoostExample = `
const GET_FILMS = gql\`{
  allFilms {
    title
  }
}\`

const App = () => (
  <Query query={GET_FILMS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        data.allFilms.map(film => (
          <div key={film.title}>
            {film.title}
          </div>
        ))
      )
    }}
  </Query>
)

render(App);
`;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
        contentWidth={1500}
        contentHeight={900}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading fit lineHeight={1} textColor="secondary">
            GraphQL All The Things
          </Heading>
          <Text margin="40px 0 0" textColor="tertiary" size={1} bold textAlign="left">
            Kam Figy<br />
            Platform Architect<br />
            <img src="/Site-Core.svg" alt="Sitecore Logo" height="100" />
          </Text>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            WTF is GraphQL?
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading>
            GraphQL is a<br/>
            query language<br/> 
            <em>for your API</em>
          </Heading>
          <Notes>
            Created by Faceboof.
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            GraphQL is<br />
            the world's best<br />
            <code>SELECT</code> statement
          </Heading>
          <Notes>
            ...but it's not a generic where statement
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            Designed for frontends
          </Heading>
          <Text textColor="primary">
            Web or otherwise.
          </Text>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            End Overfetching
          </Heading>
          <img src="/overfetch.png" alt="overfetching" />
          <Notes>
            <ul>
              <li>Reduced bandwidth usage</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            Traverse Data Graphs
          </Heading>
          <Text textColor="primary">
            Leap complex data with a single <strike>bound</strike> query.
          </Text>
          <Notes>
            <ul>
              <li>Suppose you had a REST API that gave you a summary list of articles, and another that gave the details of one article...</li>
              <li>Requests that in a traditional REST API would return everything need not do so.</li>
              <li>Reduced request count</li>
              <li>Improved latency</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            Strongly Typed
          </Heading>
          <List textColor="primary">
            <ListItem>Amazing tooling</ListItem>
            <ListItem>Self-documenting</ListItem>
            <ListItem>Static analysis (ESLint)</ListItem>
          </List>
          <Notes>
            <ul>
              <li>This is not TypeScript</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary">
          <Heading fit>
            Shut up and show me the code
          </Heading>
          <GraphiQL fetcher={graphiQLFetcher} query={initialQuery} />
          <Notes>
            <ul>
              <li>Basic query/intellisense</li>
              <li>Query relationships - get film + characters + producers</li>
              <li>Fragments + multiple queries - get two films by name with same fields</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" maxWidth="1920">
          <Heading fit>
            Ok great, but what about in React?
          </Heading>
          <ApolloProvider client={apolloClient}>
            <ComponentPlayground code={apolloBoostExample} scope={ { gql, Query } } />
          </ApolloProvider>
          <Notes>
            <ul>
              <li>Overview existing sample, Apollo, and React</li>
              <li>Add director to query + react</li>
              <li>Consider adding characters.name to looping</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" maxWidth="1920">
          <Heading fit>
            What about C<strike>R</strike>UD?
          </Heading>
          <Text textColor="primary">
            Mutations &amp; Subscriptions
          </Text>
          <Notes>
            Mutations mutate (update, create, delete) from the API graph. They return a query! So you can push data and update your UI in one call!
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" maxWidth="1920">
          <Heading fit>
            Building GraphQL APIs
          </Heading>
          <Text textColor="primary">
            Live demo on <a href="https://glitch.com/edit/#!/jet-cook?path=server.js:6:17" target="_blank" rel="noopener noreferrer" style={ { color: 'white'} }>Glitch</a>
          </Text>
          <Notes>
            There are GQL servers in almost every major language but since JavaScript is the original one, let's take a quick look at it.<br />
            Touch on resolvers being useful for aggregation.
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" maxWidth="1920">
          <Heading fit>
            What GraphQL is good at
          </Heading>
          <List textColor="primary">
            <ListItem>API Aggregation</ListItem>
            <ListItem>Flexibility for Frontend Devs/Public APIs</ListItem>
            <ListItem>Complex data updating</ListItem>
            <ListItem>Performance in SPAs</ListItem>
          </List>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" maxWidth="1920">
          <Heading fit>
            What GraphQL is bad at
          </Heading>
          <List textColor="primary">
            <ListItem>Single-use APIs</ListItem>
            <ListItem>Generic Predicates (not a <code>WHERE</code> clause)</ListItem>
            <ListItem>Sites with light JS use</ListItem>
          </List>
          <Notes>
            <ul>
              <li>Not that great if your API is purpose built and only ever used for one thing, and returns exactly what you need already</li>
              <li>GraphQL is the best SELECT statement but it does not have a WHERE clause. Filtering is entirely up to your schema and params you define.</li>
              <li>If a site is mostly a static site that uses only a little JS, there's a significant tax to most GraphQL clients (apollo is 35k gzipped), so it makes sense for JS heavy apps.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['slide']} bgColor="secondary" textColor="primary">
          <Heading fit>
            Give your REST API a rest
          </Heading>
          <img src="/rest.gif" width="500" alt="resting cute animals" />
          <Text textColor="primary" textAlign="left" bold>Resources</Text>
          <List textColor="primary">
            <ListItem><Link href="https://graphql.org/" textColor="primary">graphql.org</Link></ListItem>
            <ListItem><Link href="https://www.apollographql.com/" textColor="primary">apollographql.com</Link></ListItem>
            <ListItem>This deck: github.com/kamsar/graphql-presentation</ListItem>
          </List>
          <Text textColor="primary" textAlign="left">Find me on Twitter @kamsar</Text>
        </Slide>
      </Deck>
    );
  }
}
