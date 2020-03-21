import React from 'react'
import PropTypes from "prop-types";
import Spinner from '../spinner';

const withLoadingAnimation = (WrappedComponent) => {
    const LoadingWrapper = ({isLoading, ...props}) => (
        <React.Fragment>
            { isLoading ? <Spinner/> : <WrappedComponent {...props} /> }
        </React.Fragment>
    );

    LoadingWrapper.propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    return LoadingWrapper;
};


export default withLoadingAnimation;