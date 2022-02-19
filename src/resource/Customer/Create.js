import React, { useState } from 'react';
import {
    Create,
    TextInput,
    SelectInput,
    FormDataConsumer,
    useNotify,
    useRedirect,
    TabbedForm,
    FormTab,
    maxLength,
} from 'react-admin';
import get from "lodash/get";
import set from "lodash/set";

import DefaultActions from '../../components/DefaultActions';

import { formatCep, parseCep } from '../../misc/formaters/cep';
import { formatCpf, parseCpf } from '../../misc/formaters/cpf';
import { formatCnpj, parseCnpj } from '../../misc/formaters/cnpj';
import { formatPhone, parsePhone } from '../../misc/formaters/phone';
import states from '../../misc/consts/states';

import cepFetch from '../../misc/cepFetch';

import useStyles from './styles';
import validation from './validation';

const CustomerCreate = props => {
    const [legalEntity, setLegalEntity] = useState("1")
    const [cep, setCep] = useState("")
    const classes = useStyles();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('resources.customer.messages.sucessCreate', 'success');
        redirect('/customer');
    };

    const onErroCepFetch = () => {
        notify('resources.customer.messages.invalidCep', 'info');
    };

    return (
    <Create {...props} onSuccess={onSuccess} actions={<DefaultActions />}>
        <TabbedForm validate={validation.validationCustomer}>
            <FormTab label="resources.customer.tabs.identification">
                <FormDataConsumer>
                    {({ formData, ...rest }) => {
                        const _legalEntity = get(formData, "legal_entity");
                        const _cep = get(formData, "cep", "");
                        if (_legalEntity && legalEntity !== _legalEntity) {
                            setLegalEntity(_legalEntity);
                        }
                        if (_cep.length === 8 && cep !== _cep) {
                            setCep(_cep);
                            cepFetch(_cep)
                            .then(response => {
                                const { erro = false, bairro, complemento, localidade, logradouro, uf } = response;
                                if (erro) {
                                    onErroCepFetch();
                                } else {
                                    set(formData, 'state', uf);
                                    set(formData, 'city', localidade);
                                    set(formData, 'district', bairro);
                                    set(formData, 'address_complement', complemento);
                                    set(formData, 'public_place', logradouro);
                                }
                            })
                        }
                    }}
                </FormDataConsumer>
                <TextInput source="name" className={classes.inputXLg} validate={[maxLength(40)]} required />
                <SelectInput
                    source="legal_entity"
                    choices={[
                        { id: '0', name: 'Física' },
                        { id: '1', name: 'Jurídica' },
                    ]}
                    defaultValue="1"
                    className={classes.inputSm}
                    required
                />
                <TextInput
                    source="identity_number"
                    label={
                        legalEntity === "1"
                            ? "CNPJ"
                            : "CPF"
                    }
                    format={
                        (value) => legalEntity === "1"
                            ? formatCnpj(value)
                            : formatCpf(value)
                    }
                    parse={
                        (value) => legalEntity === "1"
                            ? parseCnpj(value)
                            : parseCpf(value)
                    }
                    validate={(value) => validation.validateIdentityNumber(value, legalEntity)}
                    className={classes.inputMd}
                />
            </FormTab>
            <FormTab label="resources.customer.tabs.contact">
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
            <FormTab label="resources.customer.tabs.address">
                <TextInput
                    source="cep"
                    format={formatCep}
                    parse={parseCep}
                    className={classes.inputMd}
                />
                <SelectInput
                    source="state"
                    choices={states}
                    defaultValue=""
                    className={classes.inputSm}
                />
                <TextInput
                    source="city"
                    className={classes.inputMd}
                />
                <TextInput
                    source="district"
                    className={classes.inputMd}
                />
                <TextInput
                    source="address_complement"
                    className={classes.inputLg}
                />
                <TextInput
                    source="public_place"
                    className={classes.inputLg}
                />
                <TextInput
                    source="address_number"
                    className={classes.inputSm}
                />
            </FormTab>
        </TabbedForm>
    </Create>
)};

export default CustomerCreate;
