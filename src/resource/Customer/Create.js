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
            <SelectInput
                source="state"
                choices={[
                    { id: "AC", name: "Acre"},
                    { id: "AL", name: "Alagoas"},
                    { id: "AP", name: "Amapá"},
                    { id: "AM", name: "Amazonas"},
                    { id: "BA", name: "Bahia"},
                    { id: "CE", name: "Ceará"},
                    { id: "DF", name: "Distrito Federal"},
                    { id: "ES", name: "Espírito Santo"},
                    { id: "GO", name: "Goiás"},
                    { id: "MA", name: "Maranhão"},
                    { id: "MT", name: "Mato Grosso"},
                    { id: "MS", name: "Mato Grosso do Sul"},
                    { id: "MG", name: "Minas Gerais"},
                    { id: "PA", name: "Pará"},
                    { id: "PB", name: "Paraíba"},
                    { id: "PR", name: "Paraná"},
                    { id: "PE", name: "Pernambuco"},
                    { id: "PI", name: "Piauí"},
                    { id: "RJ", name: "Rio de Janeiro"},
                    { id: "RN", name: "Rio Grande do Norte"},
                    { id: "RS", name: "Rio Grande do Sul"},
                    { id: "RO", name: "Rondônia"},
                    { id: "RR", name: "Roraima"},
                    { id: "SC", name: "Santa Catarina"},
                    { id: "SP", name: "São Paulo"},
                    { id: "SE", name: "Sergipe"},
                    { id: "TO", name: "Tocantins"},
                ]}
                defaultValue="RJ"
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="cep"
                format={formatCep}
                parse={parseCep}
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="public_place"
                className={classes.imputLg}
                formClassName={classes.inputInline}
            />
            <br/>
            <TextInput
                source="address_number"
                className={classes.inputSm}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="address_complement"
                className={classes.imputLg}
                formClassName={classes.inputInline}
            />
            <TextInput
                source="district"
                className={classes.inputMd}
                formClassName={classes.inputInline}
            />
            <BooleanInput source="active" defaultValue={true} />
        </SimpleForm>
    </Create>
)};

export default CustomerCreate;
