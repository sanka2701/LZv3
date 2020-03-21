import React from 'react';
import { FaRedo } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const Invalidate =({ onClick }) => (
	<React.Fragment>
    <span id='invalidateIcon' onClick={onClick}>
      <FaRedo className={`${style.icon} ${style.light}`} />
    </span>{' '}
		<UncontrolledTooltip target='invalidateIcon'>
			<FormattedMessage
				id={'icon.tooltip.invalidateData'}
				defaultMessage='Reload Data' />
		</UncontrolledTooltip >
	</React.Fragment>
);

export default Invalidate;