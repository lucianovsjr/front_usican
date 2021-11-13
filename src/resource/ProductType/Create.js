import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, useNotify, useRedirect } from "react-admin";

import useStyles from './styles';
import validation from './validation';

const ProductTypeCreate = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product_type.messages.sucessCreate', { type: 'success' });
        redirect('/product_type');
    };

    return (
        <Create onSuccess={onSuccess} mutationMode="pessimistic" {...props}>
            <SimpleForm redirect="list" validate={validation.validationProductType} >
                <TextInput source="name" validate={validation.validateName} required className={classes.inputMd} />
                <TextInput source="description"className={classes.inputXLg} />
                <BooleanInput source="active" defaultValue={true} />
            </SimpleForm>
        </Create>
    );
};

export default ProductTypeCreate;
