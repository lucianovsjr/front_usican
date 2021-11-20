import React from 'react';
import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InboxIcon from '@material-ui/icons/Inbox';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './translation';
import LoginPage from './Login';

import Customer from './resource/Customer';
import ProductType from './resource/ProductType';
import Product from './resource/Product';

const App = () => (
  <Admin
    title="Usican App"
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    loginPage={LoginPage}
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
  </Admin>
);

export default App;
