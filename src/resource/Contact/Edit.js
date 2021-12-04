import React from "react";
import {
    Edit,
    TextInput,
    BooleanInput,
    useNotify,
    useRedirect,
    TabbedForm,
    FormTab,
    maxLength,
} from "react-admin";

import { formatPhone, parsePhone } from '../../misc/formaters/phone';
import { EditToolbar } from "../../components/Toolbar";

import useStyles from './styles';
import validation from './validation';


const ContactEdit = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const classes = useStyles();

    const onSuccess = ({ data }) => {
        notify('resources.contact.messages.sucessUpdate', { type: 'success' });
        redirect(data.link_redirect);
    };

    return (
        <Edit {...props} onSuccess={onSuccess} mutationMode="pessimistic">
            <TabbedForm toolbar={<EditToolbar />} validate={validation.validationContact}>
                <FormTab label="resources.contact.tabs.identification">
                    <TextInput
                        source="customer_name"
                        className={classes.inputXLg}
                        disabled
                    />
                    <TextInput
                        source="name"
                        className={classes.inputXLg}
                        validate={[maxLength(40)]}
                        required
                    />
                    <TextInput
                        source="position"
                        className={classes.inputLg}
                        validate={[maxLength(20)]}
                        required
                    />
                    <BooleanInput source="active" />
                </FormTab>
                <FormTab label="resources.contact.tabs.contact">
                    <TextInput
                        source="email"
                        type="email"
                        className={classes.inputLg}
                        validate={validation.validateEmail}
                    />
                    <TextInput
                        source="phone_number"
                        className={classes.inputMd}
                        format={formatPhone}
                        parse={parsePhone}
                        validate={validation.validatePhone}
                    />
                    <TextInput
                        source="phone_number2"
                        className={classes.inputMd}
                        format={formatPhone}
                        parse={parsePhone}
                        validate={validation.validatePhone}
                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
}

export default ContactEdit;