/* eslint-disable import/no-anonymous-default-export */
const validateIdentityNumber = (value, legalEntity) => {
    if (value) {
        if (value.length < 11) {
            return {
                message: 'ra.validation.minValue',
                args: { min: legalEntity === '1' ? 14 : 11 },
            };
        }
        if (isNaN(Number(value))) {
            return { message: 'ra.validation.number' };
        }
    }
    return undefined;
};

const validateEmail = (value) => {
    if (value) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(value).toLowerCase())) {
            return { message: 'ra.validation.email' };
        }
    }
};

const validatePhone = (value) => {
    if (value) {
        if (value.length < 11) {
            return { message: 'resources.customer.validation.phone' };
        }
    }
};

const validateCep = (value) => {
    if (value) {
        if (value.length < 8) {
            return { message: 'resources.customer.validation.cep' };
        }
    }
};

const validationCustomer = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'ra.validation.required';
    }
    if (!values.legal_entity) {
        errors.legal_entity = 'ra.validation.required';
    }
    if (values.identity_number) {
        errors.identity_number = validateIdentityNumber(values.identity_number, values.legal_entity);
    }
    if (values.email) {
        errors.email = validateEmail(values.email);
    }
    if (values.cep) {
        errors.cep = validateCep(values.cep);
    }
    return errors;
};

export default {
    validationCustomer,
    validateIdentityNumber,
    validateEmail,
    validatePhone,
    validateCep
};
