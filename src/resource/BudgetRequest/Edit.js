import React from "react";
import {
    Edit,
    TabbedForm,
    FormTab,
    TextInput,
    ReferenceInput,
    SelectInput,
    DateInput,
    BooleanInput,
    useNotify,
    useRedirect,
    FormDataConsumer
} from "react-admin";

import CustomOptionInput from '../../components/CustomOptionInput';
import DefaultActions from '../../components/DefaultActions';

import useStyles from "./styles";
import validation from "./validation";

const BudgetRequestEdit = props => {
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.budget_request.messages.sucessCreate', { type: 'success' });
        redirect('/budget_request');
    };
    
    return (
        <Edit {...props} onSuccess={onSuccess} mutationMode="pessimistic" actions={<DefaultActions />}>
            <TabbedForm redirect="list" validate={validation.validationBudgetRequest}>
                <FormTab label="resources.budget_request.tabs.general">
                    <ReferenceInput source="customer" reference="customer" required disabled>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <FormDataConsumer>
                        {({ formData }) => {
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
                    <CustomOptionInput source="status" required />
                </FormTab>
                <FormTab label="resources.budget_request.tabs.decline">
                    <CustomOptionInput source="reason_decline" />
                    <TextInput
                        source="observation_reason"
                        defaultValue=""
                        multiline
                        minRows={3}
                        maxRows={5}
                        className={classes.inputXLg}
                    />
                    <BooleanInput source="informed_customer_decline" />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
}

export default BudgetRequestEdit;
