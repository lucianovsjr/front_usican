import React from 'react';
import { List, Datagrid, TextField, EmailField, BooleanField } from 'react-admin';

const CustomerList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone_number" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default CustomerList;
