import React from 'react';
import { ReferenceField, TextField } from 'react-admin';

const CustomOptionField = (props) => (
    <ReferenceField  {...props} reference="custom_option_item">
        <TextField source="name" />
    </ReferenceField>
);

export default CustomOptionField;
