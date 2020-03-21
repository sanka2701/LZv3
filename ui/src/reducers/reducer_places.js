import {
  GET_PLACES_SUCCESS,
  GET_PLACES_FAILURE,
  GET_PLACES_REQUEST,
  POST_PLACE_SUCCESS,
  SET_PLACE_FILTER,
  RESET_PLACE_FILTER, POST_PLACE_FAILURE, UPDATE_PLACE_FAILURE, UPDATE_PLACE_SUCCESS, INVALIDATE_PLACES
} from "../actions/types";
import { mapKeys, map } from 'lodash';
import { LM_GPS_COORDS } from "../utils/constant";
import {produce} from "immer";

const defaultFilter = {
	isSet: false,
  center: null,
  radius: 2000,
};

const defaultState = {
  byId: {},
  ids: [],
  isLoading: false,
  didInvalidate: true,
  filter: defaultFilter
};

export default function (state = defaultState, action) {
    const { places } = action.payload ? action.payload : {places: []};

    switch (action.type) {
      case POST_PLACE_SUCCESS:
				return produce(state, draftState => {
          draftState.byId = Object.assign({}, state.byId, mapKeys(places, 'id')),
          // it is important to keep order as event update/create is relying on having posted place at the last position
          draftState.ids  = state.ids.concat(map(places, 'id')),
          draftState.isLoading = false
				});

      case UPDATE_PLACE_SUCCESS:
        return produce(state, draftState => {
          draftState.byId = Object.assign({}, state.byId, mapKeys(places, 'id')),
          draftState.ids  = state.ids.concat(map(places, 'id')),
          draftState.isLoading = false
        });

      case GET_PLACES_SUCCESS:
        return produce(state, draftState => {
          draftState.byId = mapKeys(places, 'id'),
          draftState.ids = map(places, 'id'),
          draftState.isLoading = false
        });

      case POST_PLACE_FAILURE:
      case UPDATE_PLACE_FAILURE:
      case GET_PLACES_FAILURE:
        return {...state, isLoading: false};

      case INVALIDATE_PLACES:
        return {...state, didInvalidate: true};

      case GET_PLACES_REQUEST:
        return {...state, isLoading: true, didInvalidate: false};

      case SET_PLACE_FILTER:
        const { filter } = action.payload;
        return {...state,
          filter: {
            ...state.filter,
            ...filter,
						isSet: true,
          }
        };

      case RESET_PLACE_FILTER:
        return {...state, filter: defaultFilter };

      default:
        return state;
    }
}