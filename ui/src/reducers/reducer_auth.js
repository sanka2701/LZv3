import {AUTH_USER, AUTH_ERROR, AUTH_USER_OUT, AUTH_DISMISS_ERROR} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            localStorage.setItem('token', action.payload.token);
            return { ...state, user: action.payload.user };
        case AUTH_USER_OUT:
            localStorage.removeItem('token');
            return { ...state, user: null};
        case AUTH_DISMISS_ERROR:
            return { ...state, errorMessage: '' };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}