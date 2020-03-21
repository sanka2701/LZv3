import React from 'react';
import { FormattedMessage } from 'react-intl'
import { BORDER_EVENT } from '../../utils/constant';
import BorderCol from '../ui/content/bordered_content';
import moment from 'moment';
import $ from 'jquery';
import PropTypes from 'prop-types';

import styles from './post_card.module.css';

const formatDate = (dateMillis) => {
    return moment(new Date(dateMillis)).format('DD MMM');
};

const PostCard = ({post}) => {
    return (
        <div className={styles.card}>
            <div className={styles['ribbon-wrapper']}>
                <img src={post.thumbnail} className={styles.thumbnail} />
                {post.startDate && (
                    <div className={styles.ribbon}>
                        <span>
                            {formatDate(post.startDate)}
                        </span>
                    </div>
                )}
            </div>
            <h5 className={styles.title}>
                {post.title}
            </h5>
            <div className={styles["text-wrapper"]}>
                <div className={styles.preview}>
                    {$(post.content).text().slice(1,150)}
                </div>
            </div>
        </div>
    )
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostCard