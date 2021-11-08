import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'
import { CustomerHome } from './components/Customer/CustomerHome';
import { ProductHome } from './components/Product/ProductHome';
import { StoreHome } from './components/Store/StoreHome';
import { SalesHome } from './components/Sales/SalesHome';
import Footer from './Footer';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/product' component={ProductHome} />
        <Route path='/store' component={StoreHome} />
        <Route path='/customer' component={CustomerHome} />
        <Route path='/sales' component={SalesHome} />
        <Footer/>
      </Layout>
      
    );
  }
}
