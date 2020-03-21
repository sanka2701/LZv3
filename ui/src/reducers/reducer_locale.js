import { LOCALE_CHANGED } from '../actions/types';

import skMessages from '../translations/sk';
import enMessages from '../translations/en';
import plMessages from '../translations/pl';

const localizedMessages = {
    en: enMessages,
    sk: skMessages,
    pl: plMessages
};

export default function (state = {}, action) {
    switch (action.type) {
        case LOCALE_CHANGED:
            return {...state, locale: action.payload, messages: localizedMessages[action.payload]};
        default:
            return state
    }
}