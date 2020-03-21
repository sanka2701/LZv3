import { post, get } from './index';
import {
	GET_EVENTS_REQUEST,
	CHANGE_EVENT_PAGE,
	GET_EVENTS_FAILURE,
	GET_EVENTS_SUCCESS,
	POST_EVENT_SUCCESS,
	POST_EVENT_FAILURE,
	SET_EVENT_FILTER,
	RESET_EVENT_FILTER,
	SET_NOTIFICATION, UPDATE_EVENT_SUCCESS, UPDATE_EVENT_FAILURE, INVALIDATE_EVENTS
} from "./types";
import {postToFormData} from "../utils/helpers";

export const postEvent = ( event, successCallback ) => async (dispatch) => {
	dispatch(requestEvents());
	const request = {
		endpoint: 'events',
		payload: await postToFormData(event, 'event'),
		successAction: POST_EVENT_SUCCESS,
		failureAction: POST_EVENT_FAILURE,
		successCallback: () => {
			dispatch({
				type: SET_NOTIFICATION,
				payload: {
					messageId: 'not.event.createSuccess',
					type: 'success'
				}
			});
			successCallback && successCallback();
		}
	};

	dispatch(post(request));
};

export const updateEvent = (event, successCallback) => async dispatch => {
	dispatch(requestEvents());
	const request = {
		endpoint: 'events/update',
		payload: await postToFormData(event, 'event'),
		successAction: UPDATE_EVENT_SUCCESS,
		failureAction: UPDATE_EVENT_FAILURE,
		successCallback: () => {
			dispatch({
				type: SET_NOTIFICATION,
				payload: {
					messageId: 'not.event.createSuccess',
					type: 'success'
				}
			});
			successCallback && successCallback();
		}
	};

	dispatch(post(request));
};

export const setEventPagination = (pageIndex) => {
    return {
        type: CHANGE_EVENT_PAGE,
        payload: {pageIndex}
    }
};

export const invalidateEvents = () => {
	return {
		type: INVALIDATE_EVENTS
	}
};

export const requestEvents = () => {
    return {
        type: GET_EVENTS_REQUEST
    }
};

export const loadEventById = id => dispatch => {
    dispatch(requestEvents());
    const request = {
        endpoint: 'events',
        params: { id },
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_EVENTS_FAILURE
    };

    dispatch(get(request));
};

const loadEvents = () => dispatch => {
    dispatch(requestEvents());
    const request = {
        endpoint: 'events/all',
        params: {},
        successAction: GET_EVENTS_SUCCESS,
        failureAction: GET_EVENTS_FAILURE
    };
    dispatch(get(request));
};

const shouldLoadEvents = (eventId, {events}) => {
	const event = events.byId[eventId];
	if(eventId && !event) {
		return true;
	} else if(events.isLoading) {
		return false;
	} else {
		return events.didInvalidate;
	}
};

export const loadEventsIfNeeded = (eventId) => (dispatch, getState) => {
	shouldLoadEvents(eventId, getState()) && dispatch(loadEvents())
};

export const setEventFilter = filter => dispatch => {
	dispatch({
		type: SET_EVENT_FILTER,
		payload: {filter}
	})
};

export const resetEventFilter = () => dispatch => {
	dispatch({
		type: RESET_EVENT_FILTER,
	})
};