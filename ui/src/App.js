import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SiteNavigation from './containers/header/navbar';
import {get} from "./actions/index";
import {AUTH_USER, AUTH_ERROR} from './actions/types'
import axios from 'axios';
import ModalExample from "./containers/error/modal";

import TopLogo from './components/header/logo/top_logo';
import Notification from "./containers/app/notification";

class App extends Component {
	componentDidMount() {

		axios.interceptors.request.use(
			config => {
				const jwtToken = localStorage.getItem('token');
				if (jwtToken) {
					config.headers.Authorization = `Bearer ${jwtToken}`;
				}
				return config;
			},
			error => Promise.reject(error)
		);

		if (localStorage.getItem('token')) {
			console.log("Token found: ", localStorage.getItem('token'));
			const request = {
				endpoint: 'user',
				params: {},
				successAction: AUTH_USER,
				failureAction: AUTH_ERROR
			};
			this.props.get(request);
		}
	}

	render() {
		return (
			<div>
				<TopLogo/>
				<SiteNavigation/>
					<Container>
						<Notification/>
						<ModalExample/>
						{this.props.children}
					</Container>
			</div>
		);
	}
}

export default withRouter(connect(null, {get})(App));