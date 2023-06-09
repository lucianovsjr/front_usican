import React from "react";
import { List, Datagrid, TextField, BooleanField } from "react-admin";

import DefaultBulkActionButtons from "../../components/DefaultBulkActionButtons";

import ProductTypeFilters from './filters';

const ProductTypeList = props => (
    <List {...props} bulkActionButtons={<DefaultBulkActionButtons />} filters={ProductTypeFilters} empty={false}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default ProductTypeList;
