import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';

import BulkActionButtons from '../../components/BulkActionButtons';
import PhoneField from "../../components/PhoneField";

const CustomerList = props => (
    <List {...props} bulkActionButtons={<BulkActionButtons />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
            <PhoneField source="phone_number" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default CustomerList;
