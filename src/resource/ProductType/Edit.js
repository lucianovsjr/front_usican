import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput, useNotify, useRedirect } from "react-admin";

import useStyles from './styles';
import validation from './validation';

const ProductTypeEdit = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product_type.messages.sucessUpdate', { type: 'success' });
        redirect('/product_type');
    };

    return (
        <Edit onSuccess={onSuccess} mutationMode="pessimistic" {...props}>
            <SimpleForm redirect="list" validate={validation.validationProductType} >
                <TextInput source="name" validate={validation.validateName} required className={classes.inputMd} />
                <TextInput source="description"className={classes.inputXLg} />
                <BooleanInput source="active" />
            </SimpleForm>
        </Edit>
    );
};

export default ProductTypeEdit;
