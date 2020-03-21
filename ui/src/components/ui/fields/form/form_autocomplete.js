import React from 'react';
import AutocompleteInput from '../../../autocomplete_input';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withLabel from '../decorators/with_label';
import withErrorSlider from '../decorators/with_error_slider';


const BasicAutocomplete = ({ onChange, suggestions, onSuggestionSelect, value, onInputChange, ...props }) => (
    <AutocompleteInput
        {...props}
        value={value}
        onInputChange={(value) => { onChange(value); onInputChange && onInputChange(value); }}
        onSuggestionSelect={(label) => { onChange(label); onSuggestionSelect(label); }}
        suggestions={suggestions}
    />
);

const FormAutocomplete = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicAutocomplete);

export default FormAutocomplete;