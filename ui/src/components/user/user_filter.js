import React from 'react';
import {
	Label,
	Row,
	Col,
	Input
} from 'reactstrap';
import BorderCol from '../ui/content/bordered_content';
import {connect} from 'react-redux';
import {setUserFilter} from '../../actions/index';
import {
	INPUT_SEARCH_DELAY,
	ROLE_ADMIN,
	ROLE_TRUSTED_USER,
	ROLE_USER
} from '../../utils/constant';
import {FormattedMessage} from 'react-intl';

const UserFilter = ({filter, onFilterChanged}) => {
	const setFilter = (filterField, value) => {
		debugger;
		const filter = {};
		filter[filterField] = value;
		onFilterChanged(filter);
	};

	const onInputValueChanged = (event) => {
		const value = event.target.value;
		setFilter('username', value);
		// clearTimeout(this.timer);
		// this.timer = setTimeout(() => setFilter('username', value), INPUT_SEARCH_DELAY);
	};

	const onRoleChanged = (event) => {
		setFilter('role', event.target.value);
	};

	return (
		<React.Fragment>
			<Row>
				<Col sm={8}>
					<Label>
						<FormattedMessage id={'user.username'} defaultMessage={'Username'}/>
					</Label>
					<Input value={filter.username} onChange={onInputValueChanged}/>
				</Col>
				<Col>
					<Label>
						<FormattedMessage id={'user.role'} defaultMessage={'Role'}/>
					</Label>
					<Input type="select" name="select" onChange={onRoleChanged}>
						<option value=''>
							<FormattedMessage id={'user.role.ALL'} defaultMessage={'ALL'}/>
						</option>
						<option value={ROLE_USER}>
							<FormattedMessage id={'user.role.ROLE_USER'} defaultMessage={ROLE_USER}/>
						</option>
						<option value={ROLE_TRUSTED_USER}>
							<FormattedMessage id={'user.role.ROLE_TRUSTED_USER'}
																defaultMessage={ROLE_TRUSTED_USER}/>
						</option>
						<option value={ROLE_ADMIN}>
							<FormattedMessage id={'user.role.ROLE_ADMIN'} defaultMessage={ROLE_ADMIN}/>
						</option>
					</Input>
				</Col>
			</Row>
		</React.Fragment>
	)
};

export default UserFilter;
