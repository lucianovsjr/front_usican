import React from "react";
import { List, Datagrid, TextField, FunctionField  } from "react-admin";

import CustomOptionField from '../../components/CustomOptionField';
import DateField from '../../components/ra/DateField';
import ReferenceField from '../../components/ra/ReferenceField';

import { getResourcePermissions } from '../../misc/permissions';

import filters from './filters';
import BudgetRequestBulkActionButtons from './components/BudgetRequestBulkActionButtons'

const BudgetRequestList = props => {
    const budgetRequestPerms = React.useMemo(
        () => getResourcePermissions(props.permissions, props.resource),
    [props.permissions, props.resource])

    return (
        <List
            {...props}
            filters={filters}
            filterDefaultValues={{ status: 4 }}
            empty={false}
            bulkActionButtons={<BudgetRequestBulkActionButtons budgetRequestPerms={budgetRequestPerms} />}
        >
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
    )
};

export default BudgetRequestList;
