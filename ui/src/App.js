import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SiteNavigation from './containers/header/navbar';
import ModalExample from "./containers/error/modal";

import TopLogo from './components/header/logo/top_logo';
import Notification from "./containers/app/notification";
import {loginByToken} from "./actions";
import {ROOT_URL} from "./utils/constant";

class App extends Component {
	componentDidMount() {
		console.log('ROOT URL', ROOT_URL)
		if (localStorage.getItem('token')) {
			this.props.loginByToken()
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

export default withRouter(
	connect(null, {loginByToken})(App)
);