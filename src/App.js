import React from 'react';
import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InboxIcon from '@material-ui/icons/Inbox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './translation';
import LoginPage from './Login';
import Layout from './Layout';

import Customer from './resource/Customer';
import Contact from './resource/Contact';
import BudgetRequest from './resource/BudgetRequest';
import ProductType from './resource/ProductType';
import Product from './resource/Product';

const App = () => (
  <Admin
    title="Usican App"
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    loginPage={LoginPage}
    layout={Layout}
  >
    <Resource
      name="customer"
      icon={PeopleIcon}
      options={{ label: 'Cliente' }}
      list={Customer.List}
      create={Customer.Create}
      edit={Customer.Edit}
    />
    <Resource
      name="contact"
      create={Contact.Create}
      edit={Contact.Edit}
    />
    <Resource
      name="product_type"
      icon={AllInboxIcon}
      options={{ label: 'Tipo de produto' }}
      list={ProductType.List}
      edit={ProductType.Edit}
      create={ProductType.Create}
    />
    <Resource
      name="product"
      icon={InboxIcon}
      options={{ label: 'Produto' }}
      list={Product.List}
      edit={Product.Edit}
      create={Product.Create}
    />
    <Resource
      name="budget_request"
      icon={LibraryBooksIcon}
      list={BudgetRequest.List}
      edit={BudgetRequest.Edit}
      create={BudgetRequest.Create}
    />
    <Resource name="custom_option" />
    <Resource name="custom_option_item" />
  </Admin>
);

export default App;
