import { createStore, applyMiddleware } from 'redux';
import { addLocaleData } from 'react-intl'
import reduxThunk from 'redux-thunk';

import enLocaleData from 'react-intl/locale-data/en'
import skLocaleData from 'react-intl/locale-data/sk'
import plLocaleData from 'react-intl/locale-data/pl'

import reducers from '../reducers';
import { LOCALE_CHANGED } from '../actions/types';

addLocaleData([...enLocaleData, ...skLocaleData, ...plLocaleData]);

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

store.dispatch({type: LOCALE_CHANGED, payload: 'sk'});

export default store;

