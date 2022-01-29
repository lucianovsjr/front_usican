import React from 'react';
import { ReferenceInput, SelectInput } from 'react-admin';

const CustomOptionInput = (props) => (
    <ReferenceInput
        {...props}
        reference="custom_option_item"
        filter={{ custom_option__name: `${props.resource}.${props.source}` }}
    >
        <SelectInput optionText="name" />
    </ReferenceInput>
);

export default CustomOptionInput;
