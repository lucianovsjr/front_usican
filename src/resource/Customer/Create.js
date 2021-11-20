import React, { useState } from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    BooleanInput,
    FormDataConsumer,
    useNotify,
    useRedirect,
} from 'react-admin';
import get from "lodash/get";
import set from "lodash/set";

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
        notify('resources.customer.messages.sucessCreate', { type: 'success' });
        redirect('/customer');
    };

    const onErroCepFetch = () => {
        notify('resources.customer.messages.invalidCep', { type: 'info' });
    };

    return (
    <Create onSuccess={onSuccess} {...props}>
        <SimpleForm validate={validation.validationCustomer}>
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
            <TextInput source="name" className={classes.inputXLg} required />
            <SelectInput
                source="legal_entity"
                choices={[
                    { id: '0', name: 'Física' },
                    { id: '1', name: 'Jurídica' },
                ]}
                defaultValue="1"
                className={classes.inputSm}
                formClassName={classes.inputInline}
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
                formClassName={classes.inputInline}                            
            />
            <TextInput
                source="email"
                type="email"
                className={classes.inputMd}
                validate={validation.validateEmail}
            />
            <TextInput
                source="phone_number"
                className={classes.inputMd}
                formClassName={classes.inputInline}
                format={formatPhone}
                parse={parsePhone}
                validate={validation.validatePhone}
            />
            <TextInput
                source="phone_number2"
                className={classes.inputMd}
                formClassName={classes.inputInline}
                format={formatPhone}
                parse={parsePhone}
                validate={validation.validatePhone}
            />
            <br/>
            <TextInput
                source="cep"
                format={formatCep}
                parse={parseCep}
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />
            <SelectInput
                source="state"
                choices={states}
                defaultValue="RJ"
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="city"
                className={classes.inputMd}
                formClassName={classes.inputInline}
            />
            <br/>
            <TextInput
                source="district"
                className={classes.inputMd}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="address_complement"
                className={classes.inputMd}
                formClassName={classes.inputInline}
            />
            <br/>
            <TextInput
                source="public_place"
                className={classes.inputMd}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="address_number"
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />            
            <BooleanInput source="active" defaultValue={true} />
        </SimpleForm>
    </Create>
)};

export default CustomerCreate;
