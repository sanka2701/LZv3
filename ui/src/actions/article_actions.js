import { get, post } from './index';
import {
    CHANGE_ARTICLE_PAGE,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_REQUEST,
    GET_ARTICLES_SUCCESS,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_FAILURE
} from "./types";
import {postToFormData} from "../utils/helpers";

export const postArticle = (article, callback) => async dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles',
        payload: await postToFormData(article, 'article'),
        successAction: POST_ARTICLE_SUCCESS,
        failureAction: POST_ARTICLE_FAILURE,
        successCallback: () => callback && callback()
    };
    dispatch(post(request));
};

export const updateArticle = (article, callback) => async dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles/update',
        payload: await postToFormData(article, 'article'),
        successAction: UPDATE_ARTICLE_SUCCESS,
        failureAction: UPDATE_ARTICLE_FAILURE,
        successCallback: () => callback && callback()
    };
    dispatch(post(request));
};

export const loadArticleById = id => dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles',
        params: { id },
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(get(request));
};

const loadArticles = () => dispatch => {
    dispatch(requestArticles());
    const request = {
        endpoint: 'articles/all',
        successAction: GET_ARTICLES_SUCCESS,
        failureAction: GET_ARTICLES_FAILURE
    };
    dispatch(get(request));
};

const shouldLoad = (articleId, {articles}) => {
    const article = articles.byId[articleId];
    if(articleId && !article) {
        return true;
    } else if(articles.isLoading) {
        return false;
    } else {
        return articles.didInvalidate;
    }
};

export const loadArticlesIfNeeded = (articleId) => (dispatch, getState) => {
    shouldLoad(articleId, getState()) && dispatch(loadArticles())
};

export const setArticlesPagination = (pageIndex) => {
    return {
        type: CHANGE_ARTICLE_PAGE,
        payload: {pageIndex}
    }
};

export const requestArticles = () => {
    return {
        type: GET_ARTICLES_REQUEST
    }
};