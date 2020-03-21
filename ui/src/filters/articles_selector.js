import {createSelector} from "reselect";
import {chunk, values} from "lodash";
import {POSTS_PER_PAGE} from "../utils/constant";

const getPosts = ({ articles }) => articles.byId;
const getCurrentPage = ({ articles }) => articles.currentPage;

export const getArticlePageCount = createSelector(
	[ getPosts ],
	( posts ) => {
		return Math.ceil(values(posts).length / POSTS_PER_PAGE)
	}
);

export const selectArticlesForCurrentPage = createSelector(
	[getPosts, getCurrentPage],
	(posts, currentPage) => {
		const arr = chunk(values(posts), POSTS_PER_PAGE);
		return arr[currentPage - 1]
	}
);