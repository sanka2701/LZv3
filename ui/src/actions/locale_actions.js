import { LOCALE_CHANGED } from './types';
import moment from 'moment';

export const changeLocale = (locale)  => {
    moment.locale(locale === 'en' ? 'en-gb' : locale);
    return {
        type: LOCALE_CHANGED,
        payload: locale
    }
};
