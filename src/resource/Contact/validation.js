/* eslint-disable import/no-anonymous-default-export */
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

const validationContact = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'ra.validation.required';
    }
    if (!values.position) {
        errors.position = 'ra.validation.required';
    }
    if (values.email) {
        errors.email = validateEmail(values.email);
    }
    if (values.phone) {
        errors.phone = validatePhone(values.phone);
    }
    if (values.phone2) {
        errors.phone2 = validatePhone(values.phone2);
    }
    return errors;
};

export default {
    validationContact,
    validateEmail,
    validatePhone,
};
