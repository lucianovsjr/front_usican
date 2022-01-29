import React from 'react';
import { DateField } from 'react-admin';

const CustomDateField = (props) => (
    <DateField {...props} locales="en-GB" options={{ timeZone: 'UTC' }} />
);

export default CustomDateField;
