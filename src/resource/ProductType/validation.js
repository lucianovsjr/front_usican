/* eslint-disable import/no-anonymous-default-export */
const validateName = (value) => {
    if (!value) {
        return { message: 'ra.validation.required' };
    } else if (value.length > 50) {
        return { 
            message: 'ra.validation.maxLength',
            args: { max: 50 },
        };
    }
};

const validateDescription = (value) => {
    if (value && value.length > 200) {
        return { 
            message: 'ra.validation.maxLength',
            args: { max: 200 },
        };
    }
};

const validationProductType = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = validateName(values.name);
    }
    errors.description = validateDescription(values.description);
    return errors;
};

export default {
    validationProductType,
    validateName,
    validateDescription,
};
