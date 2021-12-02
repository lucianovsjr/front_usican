import React, { useState, useEffect, useMemo } from "react";
import { Create, TextInput, useNotify, useRedirect, TabbedForm, FormTab } from "react-admin";
import get from "lodash/get";

const ContactContainer = props => {
    const [location, setLocation] = useState({});
    const notify = useNotify();
    const redirect = useRedirect();

    useEffect(() => {
        if (get(props.location, 'fatherResource')) {
            setLocation(props.location);
            localStorage.setItem(props.resource, JSON.stringify(props.location))
        } else {
            setLocation(JSON.parse(localStorage.getItem(props.resource)));
        }
        
    }, [props.resource, props.location]);

    const linkRedirect = useMemo(() =>
        `/customer/${get(location, "fatherResource.record.id")}/${get(location, "fatherResource.tabRedirect")}`
    , [location]);

    const onSuccess = ({ data }) => {
        localStorage.removeItem(props.resource);
        notify('resources.contact.messages.sucessCreate', { type: 'success' });
        redirect(data.link_redirect);
    };

    return (
        <Create {...props} onSuccess={onSuccess}>
            <TabbedForm
                initialValues={{
                    customer: get(location, "fatherResource.record.id"),
                    customer_name: get(location, "fatherResource.record.name"),
                    link_redirect: linkRedirect,
                }}
            >
                <FormTab label="resources.contact.tabs.identification">
                    <TextInput source="customer_name" disabled/>
                    <TextInput source="name" />
                    <TextInput source="position" />
                </FormTab>
                <FormTab label="resources.contact.tabs.contact">
                    <TextInput source="email" />
                    <TextInput source="phone_number" />
                    <TextInput source="phone_number2" />
                </FormTab>
            </TabbedForm>
        </Create>
    );
}

export default ContactContainer;
