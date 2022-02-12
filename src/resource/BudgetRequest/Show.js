import React from 'react';
import { Show, TabbedShowLayout, Tab, ReferenceField, TextField, FunctionField, DateField, RichTextField, BooleanField } from 'react-admin';

import CustomOptionField from '../../components/CustomOptionField';
import DefaultActions from '../../components/DefaultActions';

import useStyles from './styles';

const BudgetRequestShow = (props) => {
    const classes = useStyles();

    return (
        <Show {...props} actions={<DefaultActions />}>
            <TabbedShowLayout>
                <Tab label="resources.budget_request.tabs.general">
                    <ReferenceField source="customer" reference="customer" className={classes.showField}>
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField
                        source="contact"
                        reference="contact"
                        className={classes.showField}
                    >
                        <FunctionField
                            render={(record) => `${record.name} (${record.position})`}
                        />
                    </ReferenceField>
                    <CustomOptionField addLabel source="means_receipt" className={classes.showField} />
                    <DateField source="deadline" />
                    <RichTextField source="observation" className={classes.showField} />
                    <CustomOptionField addLabel source="status" className={classes.showField} />
                </Tab>
                <Tab label="resources.budget_request.tabs.decline">
                    <CustomOptionField addLabel source="reason_decline" className={classes.showField} />
                    <RichTextField source="observation_reason" className={classes.showField} />
                    <BooleanField addLabel source="informed_customer_decline" className={classes.showField} />
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
};

export default BudgetRequestShow;
