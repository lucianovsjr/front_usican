import React, { useState, useEffect, useMemo } from "react";
import { Create, TextInput, TabbedForm, FormTab } from "react-admin";
import get from "lodash/get";

import { CreateToolbar } from "../../components/Toolbar";

const ContactContainer = props => {
    const [location, setLocation] = useState({});

    useEffect(() => {
        if (get(props.location, 'fatherResource')) {
            setLocation(props.location);
            localStorage.setItem(props.resource, JSON.stringify(props.location))
        } else {
            setLocation(JSON.parse(localStorage.getItem(props.resource)));
        }
    }, [props.resource, props.location]);

    const linkRedirect = useMemo(() => {
        const id = get(location, "fatherResource.record.id");
        const tabRedirect = get(location, "fatherResource.tabRedirect");
        if (id && tabRedirect) {
            return `/customer/${id}/${tabRedirect}`;
        } else {
            return '';
        }
    }, [location]);

    return (
        <Create {...props}>
            <TabbedForm
                initialValues={{
                    customer: get(location, "fatherResource.record.id"),
                    customer_name: get(location, "fatherResource.record.name"),
                    link_redirect: linkRedirect,
                }}
                toolbar={<CreateToolbar linkRedirect={linkRedirect} />}
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
