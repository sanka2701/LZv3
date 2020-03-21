import { post, get } from './index';
import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAILURE,
    GET_PHOTOS_SUCCESS,
    POST_PHOTO_FAILURE,
    POST_PHOTO_SUCCESS, UPDATE_PHOTO_SUCCESS, UPDATE_PHOTO_FAILURE
} from "./types";

const toFormData = async ({ photoUrl, ...weeklyPhoto }) => {
    const formData = new FormData();

    formData.append('json', JSON.stringify(weeklyPhoto));
    photoUrl instanceof File
        ? formData.append('file', photoUrl)
        : weeklyPhoto.thumbnail = photoUrl;

    return formData;
};

export const postPhoto = ( weeklyPhoto, callback ) => async (dispatch) => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw',
        payload: await toFormData(weeklyPhoto),
        successAction: POST_PHOTO_SUCCESS,
        failureAction: POST_PHOTO_FAILURE,
        successCallback: () => {
            callback && callback()
        }
    };
    dispatch(post(request));
};

export const updatePhoto = ( weeklyPhoto, callback ) => async (dispatch) => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw/update',
        payload: await toFormData(weeklyPhoto),
        successAction: UPDATE_PHOTO_SUCCESS,
        failureAction: UPDATE_PHOTO_FAILURE,
        successCallback: () => {
            callback && callback()
        }
    };
    dispatch(post(request));
};

export const requestPhotos = () => {
    return {
        type: GET_PHOTOS_REQUEST
    }
};

export const loadPhotoById = id => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw',
        params: { id },
        successAction: GET_PHOTOS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};

export const loadAllPhotos  = () => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: 'potw/list',
        successAction: GET_PHOTOS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};