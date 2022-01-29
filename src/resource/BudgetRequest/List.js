import React from "react";
import { List, Datagrid, TextField, FunctionField, ReferenceField  } from "react-admin";

import CustomOptionField from '../../components/CustomOptionField';
import DateField from '../../components/ra/DateField';

import filters from './filters';

const BudgetRequestList = props => (
    <List {...props} filters={filters} filterDefaultValues={{ status: 1 }}>
        <Datagrid rowClick="edit">
            <ReferenceField source="customer" reference="customer">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="contact" reference="contact">
                <FunctionField render={(record) => `${record.name} (${record.position})`} />
            </ReferenceField>
            <CustomOptionField source="means_receipt" />
            <DateField source="deadline" />
            <TextField source="observation" />
            <CustomOptionField source="status" />
        </Datagrid>
    </List>
);

export default BudgetRequestList;
