import React from "react";
import { Edit, TabbedForm, FormTab, TextInput, BooleanInput, useNotify, useRedirect } from "react-admin";

import DefaultActions from '../../components/DefaultActions';

import useStyles from './styles';
import validation from './validation';

const ProductTypeEdit = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product_type.messages.sucessUpdate', 'success');
        redirect('/product_type');
    };

    return (
        <Edit {...props} onSuccess={onSuccess} mutationMode="pessimistic" actions={<DefaultActions />}>
            <TabbedForm redirect="list" validate={validation.validationProductType} >
                <FormTab label="resources.product_type.tabs.general">
                    <TextInput source="name" validate={validation.validateName} required className={classes.inputMd} />
                    <TextInput source="description" validate={validation.validateDescription} className={classes.inputXLg} />
                    <BooleanInput source="active" />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

export default ProductTypeEdit;
