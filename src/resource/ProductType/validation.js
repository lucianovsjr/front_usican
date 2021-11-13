/* eslint-disable import/no-anonymous-default-export */
const validateName = (value) => {
    if (!value) {
        return { message: 'ra.validation.required' };
    }
};

const validationProductType = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = validateName(values.name);
    }
    return errors;
};

export default {
    validationProductType,
    validateName
};
