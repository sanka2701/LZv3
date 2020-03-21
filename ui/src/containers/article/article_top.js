import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {loadArticlesIfNeeded, setArticlesPagination} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import PostList from '../../components/post/post_list';
import {POST_TYPE_ARTICLE} from "../../utils/constant";
import {getArticlePageCount, selectArticlesForCurrentPage} from "../../filters/articles_selector";

const ArticleListWithSpinner = withLoadingAnimation(PostList);

class ArticleTop extends React.Component{
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        this.props.loadArticlesIfNeeded();
    }

    onPaginationChange(pageIndex) {
        this.props.setArticlesPagination(pageIndex);
    }

    render() {
        const { isLoading, articles, pageCount, currentPage } = this.props;

        return (
            <React.Fragment>
                <ArticleListWithSpinner
                  isLoading={isLoading}
                  posts={articles}
                  type={POST_TYPE_ARTICLE}
                />
                <Pagination
                  activePage={currentPage}
                  pageCount={pageCount}
                  onPageSelect={this.onPaginationChange}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        isLoading: state.articles.isLoading,
        currentPage: state.articles.currentPage,
        pageCount: getArticlePageCount(state),
        articles: selectArticlesForCurrentPage(state),
    };
};

export default compose(
    connect(mapStateToProps, { loadArticlesIfNeeded, setArticlesPagination }),
    withSideBar
)(ArticleTop);