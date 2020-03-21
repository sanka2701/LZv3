import React from 'react';
import FileUploader from '../../file_uploader';
import { compose } from 'redux'
import withField from '../decorators/with_field';
import withErrorSlider from '../decorators/with_error_slider';

const BasicUpload = ( props ) => (
    <FileUploader {...props} />
);

const FormFileUpload = compose(
    withField,
    withErrorSlider
)(BasicUpload);

export default FormFileUpload;