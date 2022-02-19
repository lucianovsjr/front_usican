import React from "react";
import { List, Datagrid, TextField, FunctionField, BulkDeleteButton  } from "react-admin";

import CustomOptionField from '../../components/CustomOptionField';
import DateField from '../../components/ra/DateField';
import ReferenceField from '../../components/ra/ReferenceField';

import filters from './filters';
import CancelButton from './components/CancelButton'
import ReopenButton from './components/ReopenButton'

const BudgetRequestBulActionButtons = props => (
    <React.Fragment>
        <CancelButton {...props} />
        <ReopenButton {...props} />
        <BulkDeleteButton {...props} />
    </React.Fragment>
);

const BudgetRequestList = props => (
    <List
        {...props}
        filters={filters}
        filterDefaultValues={{ status: 4 }}
        empty={false}
        bulkActionButtons={<BudgetRequestBulActionButtons />}
    >
        <Datagrid rowClick={(id, basePath, record) => record.status === 6 ? 'show' : 'edit'}>
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
