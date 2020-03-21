import React from 'react';
import { connect } from 'react-redux';
import { loadArticleById } from '../../actions';
import { Row, Col } from 'reactstrap';
import PostImage from '../../components/post/post_image';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import PostContent from '../../components/post/post_content';
import Spinner from '../../components/ui/spinner';
import {hasRole} from "../../utils/helpers";
import {ROLE_ADMIN} from "../../utils/constant";

class ArticleDetail extends React.Component {
    componentDidMount() {
        const { articleId } = this.props.match.params;
        (articleId && !this.props.article) && this.props.loadArticleById(articleId);

        this.onEdit = this.onEdit.bind(this);
    }

    onEdit = () => {
        const { article } = this.props;
        this.props.history.push(`/articles/edit/${article.id}`);
    };

    render () {
        const { article, currentUser } = this.props;

        if(!article) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <React.Fragment>
                {(hasRole(currentUser, [ROLE_ADMIN])) && (
                  <PostContextMenu
                    onEdit={this.onEdit}
                  />
                )}

                <Row>
                    <Col>
                        <PostImage
                          imgSrc={article.thumbnail}
                          title={article.title}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PostContent content={article.content} />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ articles, auth }, ownProps) => {
    const { articleId } = ownProps.match.params;
    return {
        article: articles.byId[articleId],
        currentUser: auth.user
    }
};

export default connect(mapStateToProps, { loadArticleById })(ArticleDetail);
