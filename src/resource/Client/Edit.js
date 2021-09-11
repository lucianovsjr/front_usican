import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const ClientEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export default ClientEdit;
