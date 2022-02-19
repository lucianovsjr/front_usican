import React from "react";
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    ReferenceInput,
    SelectInput,
    useNotify,
    useRedirect
} from "react-admin";

import DefaultActions from '../../components/DefaultActions';

import useStyles from "./styles";
import validation from "./validation";

const ProductCreate = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product.messages.sucessCreate', 'success');
        redirect('/product');
    };
    
    return (
        <Create {...props} onSuccess={onSuccess} mutationMode="pessimistic" actions={<DefaultActions />}>
            <TabbedForm redirect="list" validate={validation.validationProduct}>
                <FormTab label="resources.product.tabs.general">
                    <ReferenceInput source="product_type" reference="product_type" required validate={validation.validateProductType}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <TextInput source="description" className={classes.inputXLg} required validate={validation.validateDescription} />
                    <TextInput source="full_description" multiline minRows={3} maxRows={5} className={classes.inputXLg} />
                </FormTab>
            </TabbedForm>
        </Create>
    );
}

export default ProductCreate;
