import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// styling for whole app
import './App.css';

// components that persist on the app
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Nav';

// page specific imports
import Home from './pages/Home';
import Search from './pages/Search';
import Seasonal from './pages/Seasonal';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerPanel from './pages/CustomerPanel/CustomerPanel';
import UndeliveredCustomerOrders from './pages/CustomerPanel/UndeliveredCustomerOrders';
import DeliveredCustomerOrders from './pages/CustomerPanel/DeliveredCustomerOrders';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import UndeliveredOrders from './pages/AdminPanel/undeliveredOrders';
import DelieveredOrders from './pages/AdminPanel/deliveredOrders';
import { StoreProvider } from './utils/GlobalState';
import SingleOrder from './pages/AdminPanel/singleOrder';
import AdminPanelMaster from './pages/AdminPanel/AdminPanelMaster';
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
            <Route path='/customerpanel' element={<CustomerPanel />} />
            <Route path='/customerpanel/delivered' element={<DeliveredCustomerOrders />} />
            <Route path='/customerpanel/undelivered' element={<UndeliveredCustomerOrders />} />
            <Route path='/adminpanel' element={<AdminPanel />} />
            <Route path='/adminpanelmaster' element={<AdminPanelMaster />} />
            <Route path='/adminpanel/delievered' element={<DelieveredOrders />} />
            <Route path='/adminpanel/undelivered' element={<UndeliveredOrders />} />
            <Route path='/search' element={<Search />} />
            <Route path='/seasonal' element={<Seasonal />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<h1>Wrong page!</h1>} />
            <Route path='/singleorder/:id' element={<SingleOrder />} />
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
