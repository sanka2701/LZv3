import {
	GET_USERS_FAILURE,
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	SET_USERS_FILTER,
	RESET_USERS_FILTER,
} from '../actions/types';
import _ from 'lodash';

const defaultFilter = {
	username: null,
	role: '',
};

const defaultState = {
	byId: {},
	ids: [],
	isLoading: false,
	filter: defaultFilter
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case GET_USERS_SUCCESS:
			const {users} = action.payload;
			return {
				...state,
				byId: _.mapKeys(users, 'id'),
				ids: _.map(users, 'id'),
				isLoading: false
			};
		case GET_USERS_FAILURE:
			return {...state, isLoading: false};
		case GET_USERS_REQUEST:
			return {...state, isLoading: true};
		case SET_USERS_FILTER:
			return {...state, filter: {...state.filter, ...action.payload.filter}};
		case RESET_USERS_FILTER:
			return {...state, filter: defaultFilter};
		default:
			return state;
	}
}