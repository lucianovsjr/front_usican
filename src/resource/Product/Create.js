import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    useNotify,
    useRedirect
} from "react-admin";

import useStyles from "./styles";
import validation from "./validation";

const ProductCreate = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product.messages.sucessCreate', { type: 'success' });
        redirect('/product');
    };
    
    return (
        <Create onSuccess={onSuccess} mutationMode="pessimistic" {...props}>
            <SimpleForm redirect="list" validate={validation.validationProduct}>
                <ReferenceInput source="product_type" reference="product_type" required validate={validation.validateProductType}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="description" className={classes.inputXLg} required validate={validation.validateDescription} />
                <TextInput source="full_description" multiline minRows={3} maxRows={5} className={classes.inputXLg} />
            </SimpleForm>
        </Create>
    );
}

export default ProductCreate;
