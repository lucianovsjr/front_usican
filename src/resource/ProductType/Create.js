import React from "react";
import { Create, TabbedForm, FormTab, TextInput, useNotify, useRedirect } from "react-admin";

import DefaultActions from '../../components/DefaultActions';

import useStyles from './styles';
import validation from './validation';

const ProductTypeCreate = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product_type.messages.sucessCreate', 'success');
        redirect('/product_type');
    };

    return (
        <Create {...props} onSuccess={onSuccess} mutationMode="pessimistic" actions={<DefaultActions />}>
            <TabbedForm redirect="list" validate={validation.validationProductType} >
                <FormTab label="resources.product_type.tabs.general">
                    <TextInput source="name" validate={validation.validateName} required className={classes.inputMd} />
                    <TextInput source="description" validate={validation.validateDescription} className={classes.inputXLg} />
                </FormTab>
            </TabbedForm>
        </Create>
    );
};

export default ProductTypeCreate;
