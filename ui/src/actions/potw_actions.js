import {post, get, put, remove, requestPlaces} from './index';
import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAILURE,
    GET_PHOTOS_SUCCESS,
    POST_PHOTO_FAILURE,
    POST_PHOTO_SUCCESS,
    UPDATE_PHOTO_SUCCESS,
    UPDATE_PHOTO_FAILURE,
    DELETE_PLACES_SUCCESS,
    DELETE_PLACES_FAILURE
} from "./types";

const toFormData = async ({ photoUrl, ...weeklyPhoto }) => {
    const { title, description } = weeklyPhoto;
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    photoUrl instanceof File
        && formData.append('file', photoUrl);

    return formData;
};

export const postPhoto = ( weeklyPhoto, callback ) => async (dispatch) => {
    dispatch(requestPhotos());
    const request = {
        endpoint: `potw`,
        payload: await toFormData(weeklyPhoto),
        successAction: POST_PHOTO_SUCCESS,
        failureAction: POST_PHOTO_FAILURE,
        successCallback: callback
    };
    dispatch(post(request));
};

export const updatePhoto = ( weeklyPhoto, callback ) => async (dispatch) => {
    dispatch(requestPhotos());
    const request = {
        endpoint: `potw/${weeklyPhoto.id}`,
        payload: await toFormData(weeklyPhoto),
        successAction: UPDATE_PHOTO_SUCCESS,
        failureAction: UPDATE_PHOTO_FAILURE,
        successCallback: callback
    };
    dispatch(put(request));
};

export const deletePhoto = ( id, callback ) => async dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: `places/${id}`,
        successAction: DELETE_PLACES_SUCCESS,
        failureAction: DELETE_PLACES_FAILURE,
        successCallback: callback
    };
    dispatch(remove(request));
};

export const loadPhotoById = id => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: `potw/${id}`,
        successAction: GET_PHOTOS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};

export const loadAllPhotos  = () => dispatch => {
    dispatch(requestPhotos());
    const request = {
        endpoint: `potw`,
        successAction: GET_PHOTOS_SUCCESS,
        failureAction: GET_PHOTOS_FAILURE
    };
    dispatch(get(request));
};

export const requestPhotos = () => {
    return {
        type: GET_PHOTOS_REQUEST
    }
};