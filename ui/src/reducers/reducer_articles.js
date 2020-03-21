import {
    CHANGE_ARTICLE_PAGE,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS, INVALIDATE_ARTICLES, POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAILURE, UPDATE_ARTICLE_SUCCESS
} from '../actions/types'
import {assign, map, mapKeys, union} from 'lodash';
import produce from "immer";
import {replaceServerUrlPlaceholder} from "../utils/helpers";

const defaultState = {
    byId: {},
    ids: [],
    isLoading: false,
    didInvalidate: true,
    currentPage: 1
};

const normalizeArticleObject = article => {
    article.thumbnail = replaceServerUrlPlaceholder(article.thumbnail);
    article.content = replaceServerUrlPlaceholder(article.content);
};

export default function (state = defaultState, action) {
    const { articles } = action.payload ? action.payload : {articles: []};
    map(articles, normalizeArticleObject);

    switch(action.type) {
        case GET_ARTICLES_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = mapKeys(articles, 'id');
                draftState.ids= map(articles, 'id');
                draftState.isLoading= false;
            });

        case POST_ARTICLE_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = assign(draftState.byId, mapKeys(articles, 'id'));
                draftState.ids  = union(draftState.ids, map(articles, 'id'));
                draftState.isLoading= false;
            });

        case UPDATE_ARTICLE_SUCCESS:
            return produce(state, draftState => {
                draftState.byId = assign(draftState.byId, mapKeys(articles, 'id'));
                draftState.isLoading= false;
            });

        case GET_ARTICLES_FAILURE:
        case POST_ARTICLE_FAILURE:
        case UPDATE_ARTICLE_FAILURE:
            return {...state, isLoading: false};

        case INVALIDATE_ARTICLES:
            return {...state, didInvalidate: true};

        case GET_ARTICLES_REQUEST:
            return {...state, isLoading: true, didInvalidate: false};

        case CHANGE_ARTICLE_PAGE:
            return {...state, currentPage: action.payload.pageIndex};

        default:
            return state;
    }
}