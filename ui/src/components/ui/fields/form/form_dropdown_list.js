import React from 'react';
import { DropdownList } from 'react-widgets';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';

const BasicDropdownList = ({ onBlur, onChange, value, meta, data }) => (
    //todo: find a way to extract localized message for emptyFiles
    //todo: search by contains and not strict match
    <DropdownList
        value={value}
        onChange={onChange}
        onBlur={() => onBlur(value)}
        filter
        valueField="millis"
        textField="label"
        messages={{emptyFilter:'No options found'}}
        data={data}
    />
);

const FormDropdownList = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicDropdownList);

export default FormDropdownList;