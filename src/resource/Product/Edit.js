import React from "react";
import {
    Edit,
    TabbedForm,
    FormTab,
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    useNotify,
    useRedirect
} from "react-admin";

import DefaultActions from '../../components/DefaultActions';
import EditToolbar from '../../components/EditToolbar';

import useStyles from "./styles";
import validation from "./validation";

const ProductEdit = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product.messages.sucessUpdate', 'success');
        redirect('/product');
    };
    
    return (
        <Edit {...props} onSuccess={onSuccess} mutationMode="pessimistic" actions={<DefaultActions />}>
            <TabbedForm redirect="list" validate={validation.validationProduct} toolbar={<EditToolbar />}>
                <FormTab label="resources.product.tabs.general">
                    <ReferenceInput source="product_type" reference="product_type" required validate={validation.validateProductType}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <TextInput source="description" className={classes.inputXLg} required validate={validation.validateDescription} />
                    <TextInput source="full_description" multiline minRows={3} maxRows={5} className={classes.inputXLg} />
                    <BooleanInput source="active" />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
}

export default ProductEdit;
