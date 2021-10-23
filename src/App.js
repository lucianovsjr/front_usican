import React from 'react';
import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './translation';

import { List, Create, Edit } from './resource/Customer';

const App = () => (
  <Admin
    title="Usican App"
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="customer"
      icon={PeopleIcon}
      options={{ label: 'Cliente' }}
      list={List}
      create={Create}
      edit={Edit}
    />
  </Admin>
);

export default App;
