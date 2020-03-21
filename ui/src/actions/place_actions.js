import {get, post, remove} from './index';
import {
  GET_PLACES_FAILURE,
  GET_PLACES_SUCCESS,
  POST_PLACE_FAILURE,
  POST_PLACE_SUCCESS,
  GET_PLACES_REQUEST,
  SET_PLACE_FILTER,
  RESET_PLACE_FILTER,
  DELETE_PLACES_SUCCESS,
  DELETE_PLACES_FAILURE,
  UPDATE_PLACE_SUCCESS,
  UPDATE_PLACE_FAILURE,
  SET_NOTIFICATION,
  INVALIDATE_PLACES,
} from "./types";
import {change} from "redux-form";

export const loadPlaceById = id => dispatch => {
  dispatch(requestPlaces());
    const request = {
        endpoint: 'places/id',
        params: { id },
        successAction: GET_PLACES_SUCCESS,
        failureAction: GET_PLACES_FAILURE
    };
    dispatch(get(request));
};

export const deletePlace = id => dispatch => {
  dispatch(requestPlaces());
	const request = {
		endpoint: 'places',
		successAction: DELETE_PLACES_SUCCESS,
		failureAction: DELETE_PLACES_FAILURE,
		params: {id}
	};
	dispatch(remove(request));
};

export const loadPlaces = () => dispatch => {
  dispatch(requestPlaces());
  const request = {
    endpoint: 'places/list',
    successAction: GET_PLACES_SUCCESS,
    failureAction: GET_PLACES_FAILURE
  };
  dispatch(get(request));
};

export const postPlace = (place, successCallback) => async dispatch => {
  dispatch(requestPlaces());
    const request = {
        endpoint: 'places',
        payload: place,
        successAction: POST_PLACE_SUCCESS,
        failureAction: POST_PLACE_FAILURE
    };
    request.successCallback = () => {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          messageId: 'not.place.createSuccess',
          type: 'success'
        }
      });
      successCallback && successCallback();
    };
    await dispatch(post(request));
};

export const updatePlace = async (place, successCallback) => async dispatch => {
  dispatch(requestPlaces());
  const request = {
    endpoint: 'places/update',
    payload: place,
    successAction: UPDATE_PLACE_SUCCESS,
    failureAction: UPDATE_PLACE_FAILURE
  };
  request.successCallback = () => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        messageId: 'not.place.updateSuccess',
        type: 'success'
      }
    });
    successCallback && successCallback();
  };

  await dispatch(post(request));
};

const shouldLoadPlaces = (placeId, {places}) => {
  const place = places.byId[placeId];
  if(placeId && !place) {
    return true;
  } else if(places.isLoading) {
    return false;
  } else {
    return places.didInvalidate;
  }
};

export const loadPlacesIfNeeded = (placeId) => (dispatch, getState) => {
  shouldLoadPlaces(placeId, getState()) && dispatch(loadPlaces())
};

export const setPlaceFilter = filter => dispatch => {
  dispatch({
    type: SET_PLACE_FILTER,
    payload: { filter }
  })
};

export const resetPlaceFilter = () => dispatch => {
  dispatch({
    type: RESET_PLACE_FILTER
  })
};

export const selectPlace = (place, formName) => dispatch => {
  dispatch(change(formName, 'place', place))
};

export const invalidatePlaces = () => {
  return {
    type: INVALIDATE_PLACES
  }
};

export const requestPlaces = () => {
  return {
    type: GET_PLACES_REQUEST
  }
};