import React from 'react';
import { Layout as AdminLayout } from 'react-admin';

import AppBar from './AppBar';
import Menu from './Menu';

const Layout = props => <AdminLayout {...props} appBar={AppBar} menu={Menu} />

export default Layout;
