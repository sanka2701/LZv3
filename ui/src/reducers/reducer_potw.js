import {assign, map, mapKeys, union} from 'lodash';
import {
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_FAILURE,
    GET_PHOTOS_REQUEST,
    POST_PHOTO_FAILURE,
    UPDATE_PHOTO_FAILURE, POST_PHOTO_SUCCESS, UPDATE_PHOTO_SUCCESS
} from "../actions/types";
import {replaceServerUrlPlaceholder} from "../utils/helpers";
import produce from "immer";

const defaultState = {
    byId: {},
    ids: [],
    isLoading: false
};

const normalizeEventObject = photo => {
    photo.photoUrl = replaceServerUrlPlaceholder(photo.photoUrl);
};

export default function (state = defaultState, action) {
    const { photos } = action.payload ? action.payload : {photos: []};
    map(photos, normalizeEventObject);

    switch(action.type) {
        case GET_PHOTOS_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = mapKeys(photos, 'id');
                draftState.ids= map(photos, 'id');
                draftState.isLoading= false;
            });

        case POST_PHOTO_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = assign(draftState.byId, mapKeys(photos, 'id'));
                draftState.ids  = union(draftState.ids, map(photos, 'id'));
                draftState.isLoading= false;
            });

        case UPDATE_PHOTO_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = assign(draftState.byId, mapKeys(photos, 'id'));
                draftState.isLoading= false;
            });

        case GET_PHOTOS_FAILURE:
        case POST_PHOTO_FAILURE:
        case UPDATE_PHOTO_FAILURE:
            return {...state, isLoading: false};

        case GET_PHOTOS_REQUEST:
            return {...state, isLoading: true};

        default:
            return state;
    }
}