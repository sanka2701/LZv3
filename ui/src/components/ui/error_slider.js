import React from 'react';
import { Alert } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import './error_slider_styles.css';

export default function ({ errorCode, displayed }) {
    return(
        <div>
            <div id="message" className={displayed ? 'error' : ''}>
                <Alert color="danger">
                    <FormattedMessage id={errorCode || 'empty'} defaultMessage='Invalid field value'/>
                </Alert>
            </div>
        </div>
    )
}