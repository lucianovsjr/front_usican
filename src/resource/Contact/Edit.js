import React from "react";
import {
    Edit,
    TextInput,
    BooleanInput,
    useNotify,
    useRedirect,
    TabbedForm,
    FormTab,
} from "react-admin";

// import useStyles from './styles';
import { formatPhone, parsePhone } from '../../misc/formaters/phone';
import { EditToolbar } from "../../components/Toolbar";


const ContactEdit = props => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        notify('resources.contact.messages.sucessUpdate', { type: 'success' });
        redirect(data.link_redirect);
    };

    return (
        <Edit {...props} onSuccess={onSuccess} mutationMode="pessimistic">
            <TabbedForm toolbar={<EditToolbar />}>
                <FormTab label="resources.contact.tabs.identification">
                    <TextInput source="customer_name" disabled/>
                    <TextInput source="name" />
                    <TextInput source="position" />
                    <BooleanInput source="active" />
                </FormTab>
                <FormTab label="resources.contact.tabs.contact">
                    <TextInput source="email" />
                    <TextInput
                        source="phone_number"
                        format={formatPhone}
                        parse={parsePhone}
                    />
                    <TextInput
                        source="phone_number2"
                        format={formatPhone}
                        parse={parsePhone}
                    />
                </FormTab>
            </TabbedForm>
        </Edit>
    );
}

export default ContactEdit;