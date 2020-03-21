import React from 'react';
import {connect} from 'react-redux';
import {loadUsers, setUserFilter} from '../../actions';
import UserFilter from '../../components/user/user_filter';
import UserList from '../../components/user/user_list';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import {makeGetUsersByFilter} from '../../filters/users_filter';
import BorderCol from '../../components/ui/content/bordered_content';
import FilterMenu from "../../components/ui/menu/filter_menu";
import {Collapse} from "reactstrap";

const UserListWithSpinner = withLoadingAnimation(UserList);

class UserTop extends React.Component {
	constructor(props) {
		super(props);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onChangeFilterVisibility = this.onChangeFilterVisibility.bind(this);
		// this.onFilterReset = this.onFilterReset.bind(this);
		this.onAddUser = this.onAddUser.bind(this);
		this.state = {
			isFilterShown: true
		}
	}

	componentDidMount() {
		this.props.loadUsers();
	}

	onFilterChange = (filter) => {
		const {setUserFilter} = this.props;
		setUserFilter(filter);
	};

	onChangeFilterVisibility = () => this.setState({isFilterShown: !this.state.isFilterShown});

	// onFilterReset = () => this.props.resetEventFilter();

	onAddUser = () => this.props.history.push(`/users/edit`);

	render = () => {
		const {isLoading, users, filter} = this.props;

		return (
			<React.Fragment>
				<BorderCol sm={12}>
					<FilterMenu
						onShow={this.onChangeFilterVisibility}
						onReset={this.onFilterReset}
						onAdd={this.onAddUser}
					/>
					<Collapse isOpen={this.state.isFilterShown}>
						<UserFilter filter={filter} onFilterChanged={this.onFilterChange}/>
					</Collapse>
				</BorderCol>
				<UserListWithSpinner users={users} isLoading={isLoading}/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({users}) => {
	const getUsersByFilter = makeGetUsersByFilter();
	return {
		isLoading: users.isLoading,
		users: getUsersByFilter(users),
		filter: users.filter,
	}
};

export default connect(mapStateToProps, {loadUsers, setUserFilter})(UserTop);