import React from 'react';
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

import './post_content.css';
import styles from './post_content.module.css';

//todo: purify dangerous HTML but keep the iframe for the youtube
const PostContent = ({content}) => (
    <div className={styles.content}>
        <div
            className={'__lz_ck_content__'}
            dangerouslySetInnerHTML={{__html: content}}
            // dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}
        />
    </div>
);

PostContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default PostContent;

