import React from 'react';
import {connect} from 'react-redux';
import {Alert, Collapse} from "reactstrap";
import {FormattedMessage} from "react-intl";
import {dismissNotification} from "../../actions";

const Notification = ({ messageId, type, dismissNotification }) => {

	const onDismiss = () =>	{
		dismissNotification();
	};

	return (
		<Collapse isOpen={!!messageId}>
			<Alert
				color={type}
				toggle={onDismiss}
				style={{margin: '20px', /*backgroundColor: '#9dc183'*/}}
			>
				<FormattedMessage id={messageId ? messageId : 'empty'} defaultMessage='Something happend'/>
			</Alert>
		</Collapse>
	)
};

const mapStateToProps = ({ notification: { messageId, type } }) => {
	return {
		messageId,
		type
	}
};

export default connect(mapStateToProps, {dismissNotification})(Notification);