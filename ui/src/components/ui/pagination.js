import React from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_NUMBER_SPREAD } from '../../utils/constant';

import styles from './pagination.module.css';

const constructPageNumber = (i, isActive, onPageSelect) => (
    <a
        className={`${styles.number} ${isActive && styles.active}`}
        key={'page-key-' + i}
        onClick={() => { onPageSelect(i) }}
    >
        {i}
    </a>
);

const getPageLabels = (count, active, onPageSelect) => {
    const pageList = [];
    const lowIndex = Math.max(1, active - PAGINATION_NUMBER_SPREAD);
    const highIndex = Math.min(active + PAGINATION_NUMBER_SPREAD, count);

    if(lowIndex > 1) {
        pageList.push(constructPageNumber(1, false, onPageSelect));
        pageList.push(<span key={'lower-spread'}>...</span>);
    }

    for(let i = lowIndex; i <= highIndex; i++) {
        pageList.push(
            constructPageNumber(i, i === active, onPageSelect)
        );
    }

    if(highIndex < count) {
        pageList.push(<span key={'upper-spread'}>...</span>);
        pageList.push(constructPageNumber(count, false, onPageSelect));
    }

    return pageList;
};

const Pagination = ({ activePage, pageCount, onPageSelect }) => (
    <div className={styles.pagination}>
        { getPageLabels(pageCount, activePage, onPageSelect) }
    </div>
);

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func.isRequired
};

export default Pagination;