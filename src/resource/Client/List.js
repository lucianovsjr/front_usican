import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const ClientList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);

export default ClientList;
