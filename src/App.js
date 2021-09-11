import React from 'react';
import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
// import drfProvider from 'ra-data-drf';
import dataProvider from './dataProvider';

import authProvider from './authProvider';

import { List, Create, Edit } from './resource/Client';

// const dataProvider = drfProvider('http://localhost:8000/api')

const App = () => (
  <Admin title="Usican App" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="client"
      icon={PeopleIcon}
      options={{ label: 'Clientes' }}
      list={List}
      create={Create}
      edit={Edit}
    />
  </Admin>
);

export default App;
