import { post, put, get, remove } from './index';
import {
	GET_TAGS_REQUEST,
	GET_TAGS_FAILURE,
	GET_TAGS_SUCCESS,
	POST_TAG_FAILURE,
	POST_TAG_SUCCESS,
	SET_TAG_FILTER,
	RESET_TAG_FILTER,
	DELETE_TAG_SUCCESS,
	DELETE_TAG_FAILURE, UPDATE_TAG_SUCCESS, UPDATE_TAG_FAILURE,
} from "./types";

export const deleteTag = ( id, successCallback ) => async dispatch => {
	dispatch(requestTags());
	const request = {
		endpoint: `tags/${id}`,
		successAction: DELETE_TAG_SUCCESS,
		failureAction: DELETE_TAG_FAILURE,
		successCallback
	};
	dispatch(remove(request));
};

export const loadTagById = id => dispatch => {
	dispatch(requestTags());
	const request = {
		endpoint: `tags/${id}`,
		successAction: GET_TAGS_SUCCESS,
		failureAction: GET_TAGS_FAILURE
	};
	dispatch(get(request));
};

export const postTag = ( eventTag, successCallback ) => async (dispatch) => {
	dispatch(requestTags());
  const request = {
    	endpoint: 'tags',
   		payload: eventTag,
   		successAction: POST_TAG_SUCCESS,
   		failureAction: POST_TAG_FAILURE,
		successCallback: () => {
			successCallback && successCallback()
		}
  };
  dispatch(post(request));
};

export const updateTag = ( tag, successCallback ) => async dispatch => {
	dispatch(requestTags());
	const request = {
		endpoint: `tags/${tag.id}`,
		payload: tag,
		successAction: UPDATE_TAG_SUCCESS,
		failureAction: UPDATE_TAG_FAILURE,
		successCallback: () => {
			successCallback && successCallback()
		}
	};
	dispatch(put(request));
};

export const loadTags = () => dispatch => {
  dispatch(requestTags());
  const request = {
		endpoint: `tags`,
		successAction: GET_TAGS_SUCCESS,
		failureAction: GET_TAGS_FAILURE
  };
  dispatch(get(request));
};

const shouldLoad = (tagId, {tags}) => {
	const tag = tags.byId[tagId];
	if(tagId && !tag) {
		return true;
	} else if(tags.isLoading) {
		return false;
	} else {
		return tags.didInvalidate;
	}
};

export const loadTagsIfNeeded = (tagId) => (dispatch, getState) => {
	shouldLoad(tagId, getState()) && dispatch(loadTags())
};

export const setTagFilter = filter => dispatch => {
	dispatch({
		type: SET_TAG_FILTER,
		payload: { filter }
	})
};

export const resetTagFilter = () => dispatch => dispatch({ type: RESET_TAG_FILTER });

export const requestTags = () => {
  return {
    type: GET_TAGS_REQUEST
  }
};