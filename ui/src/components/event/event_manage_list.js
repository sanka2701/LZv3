import React from 'react';
import PropTypes from "prop-types";
import {map} from 'lodash';
import {withRouter} from "react-router-dom";

import styles from './event_manage_list.module.js.css';
import BorderCol from "../ui/content/bordered_content";
import {Table} from "reactstrap";
import {FormattedMessage} from "react-intl";

const EventManageList = ({events, history}) => {

	const getTableRows = (events) => map(events, (event, index) => {
		return (
			<tr
				className={styles.row}
				key={'event-mng-' + event.id}
				onClick={() => redirectToDetail(event.id, event.placeId)}>
				<th scope="row">
					{parseInt(index)}
				</th>
				<td>
					<img width="90px" height="90px" src={event.thumbnail} className={styles.img} />
				</td>
				<td>
					{event.title}
				</td>
				<td>
					{event.startDate}
				</td>
			</tr>
		)
	});

	const redirectToDetail = (eventId, placeId) => history.push(`/events/${eventId}/${placeId}`);

	return(
		<BorderCol>
			<Table responsive hover striped>
				<thead>
				<tr>
					<th>#</th>
					<th>
						<FormattedMessage id={'event.thumbnail'} defaultMessage={'Thumbnail'}/>
					</th>
					<th>
						<FormattedMessage id={'event.title'} defaultMessage={'Title'}/>
					</th>
					<th>
						<FormattedMessage id={'event.startDate'} defaultMessage={'Start Date'}/>
					</th>
				</tr>
				</thead>
				<tbody>
				{getTableRows(events)}
				</tbody>
			</Table>
		</BorderCol>
	);
};

EventManageList.propTypes = {
	events: PropTypes.array.isRequired
};

export default withRouter(EventManageList);