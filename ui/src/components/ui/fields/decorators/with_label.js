import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Label, FormGroup } from 'reactstrap';

const withLabel = (WrappedComponent) => ({ messageId, defaultMessage, ...props }) => (
    <FormGroup>
        <Label>
            <FormattedMessage id={messageId} defaultMessage={defaultMessage}/>
        </Label>
        <WrappedComponent {...props} />
    </FormGroup>
);

export default withLabel;