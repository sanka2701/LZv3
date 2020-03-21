import {
	GET_EVENTS_REQUEST,
	CHANGE_EVENT_PAGE,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	RESET_EVENT_FILTER,
	SET_EVENT_FILTER,
	POST_EVENT_SUCCESS,
	POST_EVENT_FAILURE,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT_FAILURE, INVALIDATE_EVENTS
} from '../actions/types';
import {map, mapKeys, assign, union} from 'lodash';
import {millisecondsToTime, replaceServerUrlPlaceholder} from "../utils/helpers";
import produce from "immer";

const defaultFilter = {
	tags: [],
	startDate: new Date().setHours(0,0,0,0),
	endDate: null,
	place: {
		center: null,
		radius: 2000,
	},
};

const defaultState = {
	byId: {},
	ids: [],
	isLoading: false,
	didInvalidate: true,
	currentPage: 1,
	filter: defaultFilter
};

const normalizeTime = millis => {
	return {
		label: millisecondsToTime(millis),
		millis
	}
};

const normalizeEventObject = event => {
	event.startTime = normalizeTime(event.startTime);
	event.endTime = normalizeTime(event.endTime);
	event.thumbnail = replaceServerUrlPlaceholder(event.thumbnail);
	event.content = replaceServerUrlPlaceholder(event.content);
};

export default function (state = defaultState, action) {
	const { events } = action.payload ? action.payload : {events: []};
	map(events, normalizeEventObject);

	switch (action.type) {
		case GET_EVENTS_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = mapKeys(events, 'id');
				draftState.ids= map(events, 'id');
				draftState.isLoading= false;
			});

		case UPDATE_EVENT_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = assign(draftState.byId, mapKeys(events, 'id'));
				draftState.isLoading= false;
			});

		case POST_EVENT_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = assign(draftState.byId, mapKeys(events, 'id'));
				draftState.ids  = union(draftState.ids, map(events, 'id'));
				draftState.isLoading= false;
			});

		case GET_EVENTS_FAILURE:
		case UPDATE_EVENT_FAILURE:
		case POST_EVENT_FAILURE:
			return {...state, isLoading: false};

		case INVALIDATE_EVENTS:
			return {...state, didInvalidate: true };

		case GET_EVENTS_REQUEST:
			return {...state, isLoading: true, didInvalidate: false};

		case CHANGE_EVENT_PAGE:
			return {...state, currentPage: action.payload.pageIndex};

		case SET_EVENT_FILTER:
			const {filter} = action.payload;
			return {
				...state,
				filter: {
					...state.filter,
					...filter,
				}
			};

		case RESET_EVENT_FILTER:
			return {...state, filter: defaultFilter};

		default:
			return state;
	}
}