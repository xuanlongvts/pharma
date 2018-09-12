import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';

const renderField = ({
    input,
    branchName,
    description,
    classNameText,
    label,
    type,
    placeholder,
    name,
    meta: { touched, error, warning }
}) => {
    let typeFile = null;

    if (type === 'text') {
        typeFile = branchName ? (
            <input {...input} name={name} type={type} disabled value={branchName} />
        ) : (
            <input {...input} name={name} type={type} placeholder={placeholder} />
        );
    }

    if (type === 'textarea') {
        typeFile = description ? (
            <textarea {...input} name={name} type={type} disabled value={description} />
        ) : (
            <textarea {...input} name={name} type={type} placeholder={placeholder} />
        );
    }

    return (
        <label className={`eachRow ${classNameText}`}>
            <span>{label}: </span>
            <div className="boxVal">
                {typeFile}
                {touched && ((error && <p className="err">{error}</p>) || (warning && <p className="warn">{warning}</p>))}
            </div>
        </label>
    );
};

class BranchForm extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
        return null;
    }

    handleSubmitFrm(e) {
        e.preventDefault();

        // const { onSubmit, handleSubmit } = this.props;
    }

    render() {
        const { reset, submitting, branchName, description, keyFrm } = this.props;

        return (
            <form onSubmit={e => this.handleSubmitFrm(e)} formkey={keyFrm}>
                <Field
                    name="branch"
                    type="text"
                    classNameText="branchName"
                    placeholder="At less 5 characters"
                    label="Branch"
                    component={renderField}
                    branchName={branchName}
                />
                <Field
                    name="description"
                    type="textarea"
                    classNameText="branchDes"
                    placeholder="At less 10 characters"
                    label="Des"
                    component={renderField}
                    description={description}
                />
                <div className="actForm">
                    <button type="submit" className="btnBlue" disabled={submitting}>
                        Pull
                    </button>
                    <button type="button" className="btnGrey" disabled onClick={reset}>
                        Reset
                    </button>
                </div>
            </form>
        );
    }
}

BranchForm.propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    keyFrm: PropTypes.number,
    reset: PropTypes.func,
    branchName: PropTypes.string,
    description: PropTypes.string
};

renderField.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    input: PropTypes.object
};

export default reduxForm({
    form: `frmDyn${Math.random()}`,
    validate,
    enableReinitialize: true
})(BranchForm);
