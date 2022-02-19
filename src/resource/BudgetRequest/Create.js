import React, { useState } from "react";
import {
    Create,
    TabbedForm,
    FormTab,
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    useNotify,
    useRedirect,
    FormDataConsumer
} from "react-admin";

import set from "lodash/set";

import CustomOptionInput from '../../components/CustomOptionInput';
import DefaultActions from '../../components/DefaultActions';

import useStyles from "./styles";
import validation from "./validation";
import transform from './transformData';

const BudgetRequestCreate = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();
    const [customerCurrent, setCustomerCurrent] = useState('')

    const onSuccess = () => {
        notify('resources.budget_request.messages.sucessCreate', { type: 'success' });
        redirect('/budget_request');
    };
    
    return (
        <Create
            {...props}
            onSuccess={onSuccess}
            mutationMode="pessimistic"
            transform={transform}
            actions={<DefaultActions />}
            record={{ status: 4 }}
        >
            <TabbedForm redirect="list" validate={validation.validationBudgetRequest}>
                <FormTab label="resources.budget_request.tabs.general">
                    <ReferenceInput source="customer" reference="customer" required>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <FormDataConsumer>
                        {({ formData }) => {
                            if (customerCurrent !== formData.customer) {
                                // Empty Contact when switch Customer
                                setCustomerCurrent(formData.customer);
                                set(formData, 'contact', '');
                            }
                            return (
                                <ReferenceInput
                                    {...props}
                                    source="contact"
                                    reference="contact"
                                    filter={{ customer: formData.customer }}
                                    allowEmpty
                                >
                                    <SelectInput
                                        optionText={(record) => `${record.name} (${record.position})`}
                                        disabled={!formData.customer}
                                    />
                                </ReferenceInput>
                            );
                        }}
                    </FormDataConsumer>
                    <CustomOptionInput source="means_receipt" required />
                    <DateInput source="deadline" />
                    <TextInput
                        source="observation"
                        defaultValue=""
                        multiline
                        minRows={3}
                        maxRows={5}
                        className={classes.inputXLg}
                    />
                </FormTab>
            </TabbedForm>
        </Create>
    );
}

export default BudgetRequestCreate;
