import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';

import PhoneField from "../../components/PhoneField";
import DefaultBulkActionButtons from "../../components/DefaultBulkActionButtons";

import CustomerFilters from './filters';

const CustomerList = props => (
    <List {...props} bulkActionButtons={<DefaultBulkActionButtons />} filters={CustomerFilters} empty={false}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="email" />
            <PhoneField source="phone_number" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default CustomerList;
