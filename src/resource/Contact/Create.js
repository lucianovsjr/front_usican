import React, { useState, useEffect, useMemo } from "react";
import { Create, TextInput, TabbedForm, FormTab, maxLength } from "react-admin";
import get from "lodash/get";

import { formatPhone, parsePhone } from '../../misc/formaters/phone';
import { CreateToolbar } from "../../components/Toolbar";

import useStyles from './styles';
import validation from './validation';
import Actions from './Actions';

const ContactContainer = props => {
    const [location, setLocation] = useState({});
    const classes = useStyles();

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
        <Create {...props} actions={<Actions linkRedirect={linkRedirect} />}>
            <TabbedForm
                initialValues={{
                    customer: get(location, "fatherResource.record.id"),
                    customer_name: get(location, "fatherResource.record.name"),
                    link_redirect: linkRedirect,
                }}
                toolbar={<CreateToolbar />}
                validate={validation.validationContact}
            >
                <FormTab label="resources.contact.tabs.identification">
                    <TextInput
                        source="customer_name"
                        className={classes.inputXLg}
                        disabled
                    />
                    <TextInput
                        source="name"
                        className={classes.inputXLg}
                        required
                        validate={[maxLength(40)]}
                    />
                    <TextInput
                        source="position"
                        className={classes.inputLg}
                        required
                        validate={[maxLength(20)]}
                    />
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
        </Create>
    );
}

export default ContactContainer;
