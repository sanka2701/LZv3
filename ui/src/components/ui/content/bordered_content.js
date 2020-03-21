import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from "prop-types";
import { BORDER_ARTICLE, BORDER_EVENT, BORDER_SIDEBAR } from '../../../utils/constant';

import styles from './bordered_content.module.css';

const resolveColor = (type) => {
    switch (type) {
        case BORDER_ARTICLE:
            return '#ed52ad';
        case BORDER_EVENT:
            return '#008000';
        case BORDER_SIDEBAR:
            // return '#FEDA00';
        default:
            return '#1C1733';
    }
};

const BorderCol = ({ children, type, grow, ...props }) => (
    <Col className={`${styles["border-wrapper"]} ${grow && styles.grow}`} style={{borderColor:resolveColor(type)}} {...props} >
        <div className={styles.border}>
            {children}
        </div>
    </Col>
);

BorderCol.propTypes = {
    type: PropTypes.string,
    grow: PropTypes.bool
};

BorderCol.defaultProps = {
    grow: false
};

export default BorderCol;