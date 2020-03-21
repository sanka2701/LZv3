import React from 'react';
import { Input } from 'reactstrap';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';


const BasicInput = ( props ) => (
    <Input {...props} />
);

const FormInput = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicInput);

export default FormInput;