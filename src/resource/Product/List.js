import React from "react";
import { List, Datagrid, TextField, BooleanField  } from "react-admin";

import ProductFilters from './filters';

import ReferenceField from '../../components/ra/ReferenceField';

const ProductList = props => (
    <List {...props} filters={ProductFilters} empty={false}>
        <Datagrid rowClick="edit">
            <ReferenceField source="product_type" reference="product_type">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="description" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default ProductList;
