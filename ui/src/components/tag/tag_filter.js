import React from 'react';
import PropTypes from "prop-types";
import {
	Row,
	Col,
	Label,
	Input} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const TagFilter = ({ onPlaceFilterChanged: onFilterChanged, filter })  => (
	<React.Fragment>
		<Row>
			<Col sm={12}>
				<Label>
					<FormattedMessage id={'tag.label'} defaultMessage={'Label'}/>
				</Label>
				<Input value={filter.searchString} onChange={(event) => onFilterChanged({searchString: event.target.value})}/>
			</Col>
		</Row>
	</React.Fragment>
);

TagFilter.propTypes = {
	onPlaceFilterChanged: PropTypes.func.isRequired,
	filter: PropTypes.object.isRequired
};

export default TagFilter;