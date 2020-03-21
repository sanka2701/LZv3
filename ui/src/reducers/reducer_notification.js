import {
	DISMISS_NOTIFICATION,
	SET_NOTIFICATION
} from "../actions/types";

const defaultState = {
	messageId: null,
	type: null,
};

export default function (state = defaultState, action) {
	switch(action.type) {
		case SET_NOTIFICATION:
			const { messageId, type } = action.payload;
			return { messageId, type };
		case DISMISS_NOTIFICATION:
			return defaultState;
		default:
			return state;
	}
}