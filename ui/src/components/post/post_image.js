import React from 'react';
import PropTypes from "prop-types";

import styles from './post_image.module.css';

const PostImage = ({ imgSrc, title }) => (
    <div className={styles.container}>
        <img src={imgSrc} />
        <div className={styles.title}>
            <h2>
                {title}
            </h2>
        </div>
    </div>
);

PostImage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default PostImage;