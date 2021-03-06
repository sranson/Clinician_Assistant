import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewPCP from './pages/NewPCP';
import NewClient from './pages/NewClient';
import CreateSoap from './pages/CreateSOAP';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

 // Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  if (!localStorage.getItem("id_token")) {
    return (
        <ApolloProvider client={client}>
          <Router>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header />
                <div className="container">
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/signup">
                      <Signup />
                    </Route>
                    <Route exact path="/dashboard">
                      <Home />
                    </Route>
                </div>
            </div>
          </Router>
        </ApolloProvider>
    );
  } else if (localStorage.getItem("id_token")) {
    return (
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <div className="flex-column justify-flex-start min-100-vh">
                <Header />
                  <div className="container">
                      <Route exact path="/">
                          <Home />
                      </Route>
                      <Route exact path="/dashboard">
                        <Dashboard />
                      </Route>
                      <Route exact path="/newClient">
                        <NewClient />
                      </Route>
                      <Route exact path="/newpcp">
                        <NewPCP />
                      </Route>
                      <Route exact path="/createsoap">
                        <CreateSoap />
                      </Route>
                  </div>
              </div>
            </Switch>
          </Router>
        </ApolloProvider>
    );
  }

}

export default App;
