import React from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

class ShowHide extends React.Component {
	constructor(props) {
		super(props);
		this.onIconClick = this.onIconClick.bind(this);
		this.state = {
			isShown: false
		}
	}

	onIconClick(event) {
		const { isShown } = this.state;
		const { onClick } = this.props;
		this.setState({ isShown: !isShown });
		onClick(event);
	}

	render() {
		const { isShown } = this.state;

		return (
			<React.Fragment>
			<span id='toogleIcon' onClick={this.onIconClick}>
				{
					isShown
						? (<FaEye className={`${style.icon} ${style.dark}`}/>)
						: (<FaEyeSlash className={`${style.icon} ${style.light}`}/>)
				}
			</span>{' '}
				<UncontrolledTooltip target='toogleIcon'>
					<FormattedMessage
						id='icon.tooltip.showHide'
						defaultMessage='Show/hide' />
				</UncontrolledTooltip>
			</React.Fragment>
		)
	}
}

export default ShowHide;