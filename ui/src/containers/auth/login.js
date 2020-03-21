import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import {Button, FormGroup, Label, Input, Alert} from 'reactstrap';
import {dismissAuthError, loginUser} from '../../actions';
import BorderCol from '../../components/ui/content/bordered_content';
import {map, each} from 'lodash';

const FIELDS = {
	username: {
		id: 'username',
		type: 'text',
		i18nText: 'auth.username',
		defaultMsg: 'Username'
	},
	password: {
		id: 'password',
		type: 'password',
		i18nText: 'auth.password',
		defaultMsg: 'Password',
	}
};

class Login extends Component {
	constructor(props){
		super(props);
		this.renderError  = this.renderError.bind(this);
		this.addFormField = this.addFormField.bind(this);
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
		const { location, loginUser } = this.props;
		const { from } = location.state || { from: { pathname: '/' } };

		const successCallback = () => {
			this.props.history.push(from)
		};

		loginUser(formProps, successCallback);
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
						<FormattedMessage id='auth.login' defaultMessage='Login'/>
					</h3>
					{map(FIELDS, this.addFormField)}
					<Button type='submit' color="primary">
						<FormattedMessage id='general.submit' defaultMessage='Submit'/>
					</Button>{' '}
					<Button type='button' color="warning">
						<FormattedMessage id='general.cancel' defaultMessage='Cance'/>
					</Button>{' '}
				</form>
			</BorderCol>
		)
	}
}

function validate(values) {
	const errors = {};

	each(FIELDS, (type, field) => {
		if (!values[field]) {
			errors[field] = 'auth.mandatoryField';
		}
	});

	return errors;
}

function mapStateToProps(state) {
	return {apiErrors: state.auth.errorMessage.errors}
}

export default compose(
	connect(mapStateToProps, {loginUser, dismissAuthError}),
	reduxForm({form: 'login', validate})
)(Login);
