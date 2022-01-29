/* eslint-disable import/no-anonymous-default-export */
const validationBudgetRequest = (values) => {
    const errors = {};
    if (!values.customer) {
        errors.customer = 'ra.validation.required';
    }
    if (!values.means_receipt) {
        errors.means_receipt = 'ra.validation.required';
    }
    if (!values.status) {
        errors.status = 'ra.validation.required';
    }
    return errors;
};

export default {
    validationBudgetRequest
};
