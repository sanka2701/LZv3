import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './post_mini_card.module.css';

const formatToDay = (dateMillis) => {
    return moment(new Date(dateMillis)).format('DD');
};

const formatToMonth = (dateMillis) => {
    return moment(new Date(dateMillis)).format('MMM');
};

const PostMiniCard = ({ post }) => (
    <div className={styles['list-item']}>
        <div className={styles['img-wrapper']}>
            <img src={post.thumbnail} className={styles.thumbnail} />
            {post.startDate && (
                <div className={styles.date}>
                    <div className={styles.day}>
                        {formatToDay(post.startDate)}
                    </div>
                    <div className={styles.month}>
                        {formatToMonth(post.startDate)}
                    </div>
                </div>
            )}
        </div>
        <h5 className={styles.title}>
            {post.title}
        </h5>
    </div>
);

PostMiniCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostMiniCard;