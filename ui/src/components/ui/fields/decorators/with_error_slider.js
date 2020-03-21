import React from 'react';
import ErrorSlider from '../../error_slider';

const withErrorSlider = (WrappedComponent) => ({meta, input, ...props}) => (
    <div>
        <WrappedComponent {...input} {...props}/>
        <ErrorSlider
            errorCode={meta.error}
            displayed={meta.touched && !!meta.error}
        />
    </div>
);

export default withErrorSlider;