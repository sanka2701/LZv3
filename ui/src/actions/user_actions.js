import {
    AUTH_DISMISS_ERROR,
    AUTH_ERROR,
    AUTH_USER,
    AUTH_USER_OUT,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    SET_NOTIFICATION,
    SET_USERS_FILTER,
    UPDATE_USERS_FAILURE,
    UPDATE_USERS_SUCCESS
} from "./types";
import { get, post, put } from "./index";

export const registerUser = (registerParam, callback) => dispatch => {
    dispatch(requestUsers());
    const request = {
        endpoint: `users`,
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
        endpoint: `users/login`,
        payload: credentials,
        successAction: AUTH_USER,
        failureAction: AUTH_ERROR,
        successCallback: () => {
            callback && callback();
        }
    };
    dispatch(post(request));
};

export const loginByToken = () => dispatch => {
    // token is attached by axios interceptor
    dispatch(requestUsers());
    const request = {
        endpoint: `users/me`,
        successAction: AUTH_USER,
        failureAction: AUTH_ERROR
    };
    dispatch(get(request));
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

export const updateUser = (user, callback) => dispatch => {
	//todo: success and failure actions are emitted but not yet processed in reducer
    dispatch(requestUsers());
    const request = {
        endpoint: `users/${user.id}`,
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

    dispatch(put(request));
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
        endpoint: `users/${id}`,
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