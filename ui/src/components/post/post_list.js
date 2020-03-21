import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import BorderCol from '../ui/content/bordered_content';
import PostCard from './post_card';
import PropTypes from "prop-types";
import { map } from 'lodash';
import {POST_TYPE_ARTICLE, POST_TYPE_EVENT} from "../../utils/constant";

import styles from '../../containers/event/event_list.module.css';

const getLink = (post, type) => {
  switch (type) {
    case POST_TYPE_EVENT:
      return `/events/${post.id}/${post.placeId}`;
    case POST_TYPE_ARTICLE:
      return `/articles/${post.id}`;
    default:
      throw 'Unrecognized type of post passed to PostList-er'
  }
};

const getRows = ({ posts, type }) => map(posts, post => (
    <BorderCol md={6} grow={true} key={'event-' + post.id} >
        <Link to={getLink(post, type)}
              style={{textDecoration: 'none', color: 'inherit', height: '100%'}}>
            <PostCard post={post}/>
        </Link>
    </BorderCol>
));

const PostList = state => (
    <Row className={'row-eq-height'} >
        { getRows(state) }
    </Row>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired
};

export default PostList;