import React from 'react';
import { DateTimePicker } from 'react-widgets';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';
import momentLocaliser from 'react-widgets-moment';
import moment from 'moment'

momentLocaliser(moment);

const BasicDateTimePicker = ({ /*onChange,*/ value, onBlur, ...props}) => {
    console.debug('BasicDateTimePicker - incoming value:', value);
    console.debug('BasicDateTimePicker - typeof value',typeof value);

    return (<DateTimePicker
        {...props}
        onBlur={() => onBlur(value)}
        format="DD MMM YYYY"
        time={false}
        value={value}
    />
)};

const FormDateTimePicker = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicDateTimePicker);

export default FormDateTimePicker;