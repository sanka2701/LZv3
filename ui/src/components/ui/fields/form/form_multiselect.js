import React from 'react';
import { Multiselect } from 'react-widgets';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';


const BasicMultiselect = ( {value, onBlur, ...props} ) => { return(
  <Multiselect
    defaultValue={!value ? [] : value}
    onBlur={() => onBlur(value)}
    {...props}
  />
)};

const FormMultiselect = compose(
  withLabel,
  withField,
  withErrorSlider
)(BasicMultiselect);

export default FormMultiselect;