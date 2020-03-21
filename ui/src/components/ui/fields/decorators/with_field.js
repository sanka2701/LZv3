import React from 'react';
import { Field } from 'redux-form';

const withField = (WrappedComponent) => ({ name, validate, ...props }) => (
    <Field
        component={WrappedComponent}
        name={name}
        validate={validate}
        {...props}
    />
);

export default withField;