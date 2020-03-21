import { mapKeys, map } from 'lodash';
import {
	GET_TAGS_SUCCESS,
	GET_TAGS_FAILURE,
	GET_TAGS_REQUEST,
	RESET_TAG_FILTER,
	SET_TAG_FILTER, POST_TAG_SUCCESS, INVALIDATE_TAGS, POST_TAG_FAILURE, UPDATE_TAG_FAILURE, UPDATE_TAG_SUCCESS,
} from "../actions/types";
import {produce} from "immer";

const defaultFilter =  {
	isSet: false,
	searchString: ''
};

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false,
	didInvalidate: true,
	filter: defaultFilter
};

export default function (state = defaultState, action) {
	const { tags } = action.payload ? action.payload : {tags: []};

  switch(action.type) {
		case POST_TAG_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = Object.assign({}, state.byId, mapKeys(tags, 'id')),
				draftState.ids  = state.ids.concat(map(tags, 'id')),
				draftState.isLoading = false
			});

		case UPDATE_TAG_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = Object.assign({}, state.byId, mapKeys(tags, 'id')),
				draftState.ids  = state.ids.concat(map(tags, 'id')),
				draftState.isLoading = false
			});

    case GET_TAGS_SUCCESS:
			return produce(state, draftState => {
				draftState.byId = mapKeys(tags, 'id'),
				draftState.ids = map(tags, 'id'),
				draftState.isLoading = false
			});

		case UPDATE_TAG_FAILURE:
		case POST_TAG_FAILURE:
    case GET_TAGS_FAILURE:
      return {...state, isLoading: false};

		case INVALIDATE_TAGS:
			return {...state, didInvalidate: true};

    case GET_TAGS_REQUEST:
      return {...state, isLoading: true, didInvalidate: false};

		case SET_TAG_FILTER:
			const { filter } = action.payload;
			return {...state,
				filter: {
					...state.filter,
					...filter,
					isSet: true,
				}
			};

		case RESET_TAG_FILTER:
			return {...state, filter: defaultFilter };

    default:
      return state;
  }
}