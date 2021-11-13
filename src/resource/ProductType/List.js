import React from "react";
import { List, Datagrid, TextField, BooleanField } from "react-admin";

const ProductTypeList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="active" />
        </Datagrid>
    </List>
);

export default ProductTypeList;
