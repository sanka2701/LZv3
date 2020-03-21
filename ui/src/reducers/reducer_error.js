import {ERROR_DISMISSED} from '../actions/types';

export default function (state = {}, action) {
    const reqReg = new RegExp(/^[A-Z_]+\_FAILURE$/g);
    if(reqReg.test(action.type)) {
        debugger;
        return {messageId: 'error.backend.saving', detail: action.payload};
    } else if (action.type === ERROR_DISMISSED) {
        return {}
    } else {
        return state
    }

    // switch (action.type) {
    //     case ERROR_DISMISSED:
    //         return {};
    //
    //     case GET_EVENTS_FAILURE:
    //     case POST_EVENT_FAILURE:
    //         return {messageId: 'error.backend.saving', detail: action.payload};
    //
    //     default:
    //         return state;
    // }
}