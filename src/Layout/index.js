import React from "react";
import { Layout as AdminLayout } from "react-admin";

import AppBar from "./AppBar";

const Layout = props => <AdminLayout {...props} appBar={AppBar} />

export default Layout;
