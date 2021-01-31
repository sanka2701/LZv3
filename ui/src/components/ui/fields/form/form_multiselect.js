import React from 'react';
import { Multiselect } from 'react-widgets';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';

/**
 * Function to compensate for Multiselect internal bug.
 *
 *
 */
var selectValueProp = (selection, valueField) => {
    var newValue = Array.isArray(selection) && selection.every( value => typeof value === 'object') && valueField
        ? selection.map(value => value[valueField])
        : selection

    return newValue;
}

const BasicMultiselect = ( {value, onBlur, onChange, valueField, ...props} ) => {
  return(
  <Multiselect
    defaultValue={!value ? [] : value}
    onBlur={() => onBlur(value)}
    onChange={value => onChange(selectValueProp(value, valueField))}
    valueField={valueField}
    {...props}
  />
)};

const FormMultiselect = compose(
  withLabel,
  withField,
  withErrorSlider
)(BasicMultiselect);

export default FormMultiselect;