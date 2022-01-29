import React from 'react';
import { ReferenceInput, SelectInput, DateInput, BooleanInput } from 'react-admin';

import CustomOptionInput from '../../components/CustomOptionInput';

const filters = [
    (<ReferenceInput source='customer' reference="customer">
        <SelectInput optionText="name" />
    </ReferenceInput>),
    <DateInput source="deadline__gt" />,
    <DateInput source="deadline__lt" />,
    <CustomOptionInput source="status" />,
    <BooleanInput source="informed_customer_decline" />,
];

export default filters;
