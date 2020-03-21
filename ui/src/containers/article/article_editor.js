import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postArticle, loadArticleById, updateArticle} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import ArticleEditForm from './article_edit_form';
import PropTypes from "prop-types";

const EditFormWithSpinner = withLoadingAnimation(ArticleEditForm);

class ArticleEditor extends Component{
    constructor(props) {
        super(props);
        this.onSubmit  = this.onSubmit.bind(this);
        this.onCancel  = this.onCancel.bind(this);
    }

    componentDidMount() {
        const { articleId } = this.props.match.params;
        (articleId && !this.props.article) && this.props.loadArticleById(articleId);
    }

    onSubmit(article) {
        const successCallback = () => {
            this.props.history.push('/articles/')
        };

        article.id
          ? this.props.updateArticle(article, successCallback)
          : this.props.postArticle(article, successCallback);
    }

    onCancel() {
        const { history, article } = this.props;
        history.push(`/articles/${article.id}`);
    }

    render() {
        const { match: {params: { articleId }}, article, isLoading } = this.props;
        const editMode  = !!articleId;

        return (
            <React.Fragment>
                <EditFormWithSpinner
                    isLoading={isLoading}
                    editMode={editMode}
                    initialValues={{ ...article }}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </React.Fragment>
        )
    }
}

ArticleEditor.propTypes = {
    article: PropTypes.object
};

ArticleEditor.defaultProps = {
    article: null
};

function mapStateToProps({ articles }, ownProps) {
    const { articleId } = ownProps.match.params;
    return {
        isLoading: articles.isLoading,
        article: articles.byId[articleId]
    }
}

export default connect(mapStateToProps, { postArticle, updateArticle, loadArticleById })(ArticleEditor);