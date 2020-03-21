import React from 'react';
import styles from './view_text.module.css';

const ViewText = ({children, ...props}) => (
  //todo: Input is just temporary, style later
  <div className={styles.text}>
      {children}
  </div>
);

export default ViewText;