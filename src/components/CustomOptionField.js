import React from 'react';
import { TextField } from 'react-admin';

import ReferenceField from '../components/ra/ReferenceField';

const CustomOptionField = (props) => (
    <ReferenceField  {...props} reference="custom_option_item">
        <TextField source="name" />
    </ReferenceField>
);

export default CustomOptionField;
