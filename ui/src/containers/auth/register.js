import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {Button, FormGroup, Label, Input, Alert} from 'reactstrap';
import {dismissAuthError, registerUser} from '../../actions';
import BorderCol from '../../components/ui/content/bordered_content';
import {map, each} from 'lodash';

const FIELDS = {
	/*
	email: {
		id: 'email',
		type: 'email',
		i18nText: 'auth.email',
		defaultMsg: 'Email',
		mandatory: false
	},
	*/
	username: {
		id: 'username',
		type: 'text',
		i18nText: 'auth.username',
		defaultMsg: 'Username',
		mandatory: true
	},
	password: {
		id: 'password',
		type: 'password',
		i18nText: 'auth.password',
		defaultMsg: 'Password',
		mandatory: true
	},
	passwordVerify: {
		id: 'passwordVerify',
		type: 'password',
		i18nText: 'auth.passwordVerify',
		defaultMsg: 'Repeat Password',
		mandatory: true
	}
};

class Register extends Component {

	constructor(props) {
		super(props);
		this.addFormField = this.addFormField.bind(this);
		this.renderError  = this.renderError.bind(this);
	}

	componentWillUnmount() {
		this.props.dismissAuthError();
	}

	renderField(field) {
		const errorMessage = (field.meta.touched && field.meta.error) && (
			<Alert color="danger">
				<FormattedMessage id={field.meta.error} defaultMessage='Mandatory Field'/>
			</Alert>
		);

		return (
			<FormGroup>
				<Label for={field.config.id}>
					<FormattedMessage id={field.config.i18nText} defaultMessage={field.config.defaultMsg}/>
				</Label>
				<Input type={field.config.type} id={field.config.id} {...field.input}/>
				{errorMessage}
			</FormGroup>
		)
	}

	addFormField(fieldConfig) {
		return (
			<Field key={fieldConfig.id}
						 name={fieldConfig.id}
						 config={fieldConfig}
						 component={this.renderField}
			/>
		)
	}

	onSubmit = formProps => {
		const successCallback = () => {
			this.props.history.push('/')
		};
		this.props.registerUser(formProps, successCallback);
	};

	renderError = errorCode =>
		<Alert color="danger">
			<FormattedMessage id={errorCode} defaultMessage= {`Unexpected Error. Error code: ${errorCode}`} />
		</Alert>;

	render() {
		const {handleSubmit, apiErrors} = this.props;

		return (
			<BorderCol>
				{map(apiErrors, this.renderError)}

				<form onSubmit={handleSubmit(this.onSubmit)}>
					<h3>
						<FormattedMessage id='auth.register' defaultMessage='Register'/>
					</h3>
					{map(FIELDS, this.addFormField)}
					<Button type='submit' color="primary">
						<FormattedMessage id='general.submit' defaultMessage='Submit'/>
					</Button>{' '}
					<Button type='button' color="warning">
						<FormattedMessage id='general.cancel' defaultMessage='Cance'/>
					</Button>
				</form>
			</BorderCol>
		)
	}
}

function validate(values) {
	const errors = {};

	each(FIELDS, (type, field) => {
		if (!values[field] && type.mandatory) {
			errors[field] = 'auth.mandatoryField';
		}
	});

	if (values.password !== values.passwordVerify) {
		errors.passwordVerify = 'auth.passwordMismatch';
	}

	return errors;
}

function mapStateToProps(state) {
	return {apiErrors: state.auth.errorMessage.errors}
}

export default compose(
	connect(mapStateToProps, {registerUser, dismissAuthError}),
	reduxForm({form: 'register', validate})
)(Register);
