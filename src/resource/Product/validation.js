/* eslint-disable import/no-anonymous-default-export */
const validateProductType = (value) => {
    if (!value) {
        return { message: 'ra.validation.required' };
    }
};

const validateDescription = (value) => {
    if (!value) {
        return { message: 'ra.validation.required' };
    } else if (value.length > 200) {
        return { 
            message: 'ra.validation.maxLength',
            args: { max: 200 },
        }
    }
};

const validationProduct = (values) => {
    const errors = {};
    if (!values.product_type) {
        errors.product_type = validateProductType(values.product_type);
    }
    errors.description = validateDescription(values.description);
    return errors;
};

export default {
    validationProduct,
    validateProductType,
    validateDescription,
};
