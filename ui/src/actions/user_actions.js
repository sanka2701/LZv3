import {
    AUTH_DISMISS_ERROR,
    AUTH_ERROR,
    AUTH_USER,
    AUTH_USER_OUT,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS, SET_NOTIFICATION,
    SET_USERS_FILTER, UPDATE_USERS_FAILURE, UPDATE_USERS_SUCCESS
} from "./types";
import {get, post} from "./index";

export const registerUser = (registerParam, callback) => dispatch => {
    dispatch(requestUsers());
    const request = {
        endpoint: 'users',
        payload: registerParam,
        successAction: AUTH_USER,
        failureAction: AUTH_ERROR,
        successCallback: () => {
            callback && callback()
        }
    };
    dispatch(post(request));
};

export const loginUser = (credentials, callback) => dispatch => {
    dispatch(requestUsers());
    const request = {
        endpoint: 'users/login',
        payload: credentials,
        successAction: AUTH_USER,
        failureAction: AUTH_ERROR,
        successCallback: () => {
            callback && callback();
        }
    };
    dispatch(post(request));
};

export const logoutUser = () => {
    return {
        type: AUTH_USER_OUT,
        payload: null
    }
};

export const dismissAuthError = () => {
    return {
        type: AUTH_DISMISS_ERROR
    }
};

export const requestUsers = () => {
    return {
        type: GET_USERS_REQUEST
    }
};

export const postUser = () => {
    //todo
};

export const updateUser = (user, callback) => dispatch => {
	//todo: success and failure actions are emitted but not yet processed in reducer
    dispatch(requestUsers());
    const request = {
        endpoint: 'users/update',
        payload: user,
        successAction: UPDATE_USERS_SUCCESS,
        failureAction: UPDATE_USERS_FAILURE
    };
    request.successCallback = () => {
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                messageId: 'not.user.updateSuccess',
                type: 'success'
            }
        });
        callback && callback();
    };

    dispatch(post(request));
};

export const loadUsers = () => dispatch => {
    dispatch(requestUsers());
    const request = {
        endpoint: 'users',
        successAction: GET_USERS_SUCCESS,
        failureAction: GET_USERS_FAILURE
    };
    dispatch(get(request));
};

export const loadUserById = id => dispatch => {
    const request = {
        endpoint: 'users/id',
        params: { id },
        successAction: GET_USERS_SUCCESS,
        failureAction: GET_USERS_FAILURE
    };
    dispatch(get(request));
};

export const setUserFilter = (filter) => {
    return {
        type: SET_USERS_FILTER,
        payload: { filter }
    }
};