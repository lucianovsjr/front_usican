import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    useNotify,
    useRedirect
} from "react-admin";

import useStyles from "./styles";
import validation from "./validation";

const ProductEdit = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.product.messages.sucessUpdate', { type: 'success' });
        redirect('/product');
    };
    
    return (
        <Edit onSuccess={onSuccess} mutationMode="pessimistic" {...props}>
            <SimpleForm redirect="list" validate={validation.validationProduct}>
                <ReferenceInput source="product_type" reference="product_type" required validate={validation.validateProductType}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="description" className={classes.inputXLg} required validate={validation.validateDescription} />
                <TextInput source="full_description" multiline minRows={3} maxRows={5} className={classes.inputXLg} />
                <BooleanInput source="active" />
            </SimpleForm>
        </Edit>
    );
}

export default ProductEdit;
