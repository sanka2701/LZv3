import React from 'react';
import { DateTimePicker } from 'react-widgets';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';
import momentLocaliser from 'react-widgets-moment';
import moment from 'moment'

momentLocaliser(moment);

const BasicDateTimePicker = ({ onChange, onBlur, value, ...props}) => (
    <DateTimePicker
        {...props}
        onChange={(val) => { val && onChange(val.getTime())}}
        onBlur={() => onBlur(value)}
        format="DD MMM YYYY"
        time={false}
        value={!value ? null : new Date(value)}
    />
);

const FormDateTimePicker = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicDateTimePicker);

export default FormDateTimePicker;