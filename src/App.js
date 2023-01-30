import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// hamburger menu
// styling for whole app
import './App.css';

// components that persist on the app
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Nav';

// page specific imports
import Home from './pages/Home';
import Search from './pages/Search';
import Slushies from './pages/Slushies';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerPanel from './pages/CustomerPanel';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink ({
  uri:'/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <StoreProvider>
          <Navbar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          {/* pagewrap for the hamburger menu */}
          <div id='page-wrap'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/customerpaner' element={<CustomerPanel />} />
            <Route path='/search' element={<Search />} />
            <Route path='/slushies' element={<Slushies />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<h1>Wrong page!</h1>} />
          </Routes>
          <Footer />
          </div>
        </StoreProvider>
        </>
      </Router>
      </ApolloProvider>
  );
}

export default App;
