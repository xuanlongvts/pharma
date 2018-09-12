const validate = values => {
    const errors = {};
    if (!values.branch) {
        errors.branch = 'Required';
    } else if (values.branch.length < 5) {
        errors.branch = 'At least 5 characters';
    }

    if (!values.description) {
        errors.description = 'Required';
    } else if (values.description.length < 10) {
        errors.description = 'At least 10 characters';
    }

    return errors;
};

export default validate;
