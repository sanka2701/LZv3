import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const Filter =({ onClick }) => (
  <React.Fragment>
    <span id='resetIcon' onClick={onClick}>
      <FaFilter className={`${style.icon} ${style.light}`} />
    </span>{' '}
    <UncontrolledTooltip target='resetIcon'>
      <FormattedMessage
        id={'icon.tooltip.resetPlaceFilter'}
        defaultMessage='Reset Filter' />
    </UncontrolledTooltip >
  </React.Fragment>
);

export default Filter;