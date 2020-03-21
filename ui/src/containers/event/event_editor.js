import React from 'react';
import {connect} from 'react-redux';
import {
	postEvent,
	updateEvent,
	updatePlace,
	postPlace,
	loadTagsIfNeeded, loadEventsIfNeeded, loadPlacesIfNeeded
} from '../../actions';
import EventEditForm from '../../components/event/event_edit_form';
import PropTypes from "prop-types";
import {values, last} from 'lodash';
import store from '../../services/store';
import {produce} from "immer";
import {makeLoadingSelector} from "../../filters/loading_selector";
import withLoadingAnimation from "../../components/ui/content/withLodingAnimation";

const EventEditFormWithLoader = withLoadingAnimation(EventEditForm);

class EventEditor extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onApprove = this.onApprove.bind(this);
	}

	componentDidMount() {
		const {eventId, placeId} = this.props.match.params;
		this.props.loadEventsIfNeeded(eventId);
		this.props.loadPlacesIfNeeded(placeId);
		this.props.loadTagsIfNeeded();
	}

	async onSubmit(event) {
		if(!event.place.id){
			await this.props.postPlace(event.place);
		}

		const apiEvent = produce(event, draft => {
			draft.placeId = event.place.id || last(store.getState().places.ids);
			draft.endTime = event.endTime.millis;
			draft.startTime = event.startTime.millis;
			//fixme: this is causing troubles when extracting the ids the form sometimes passes array of numbers instead of objects
			draft.tags = event.tags.map(tag => tag.id);
			delete draft.place;
		});

		const successCallback = () => {
			this.props.history.push('/events/')
		};

		event.id
			? this.props.updateEvent(apiEvent, successCallback)
			: this.props.postEvent(apiEvent, successCallback)
	}

	onApprove() {
		const {event} = this.props;
		event.approved = true;
		debugger;
		this.props.updateEvent(event);
	}

	onCancel() {
		this.props.history.goBack();
	}

	render() {
		const {match: {params: {eventId, placeId}}, event, place, tags, isLoading} = this.props;
		const editMode = !!eventId && !!placeId;

		return (
			<React.Fragment>
				<EventEditFormWithLoader
					isLoading={isLoading}
					editMode={editMode}
					tags={tags}
					initialValues={editMode ? {...event, place} : null}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
					onApprove={this.onApprove}
				/>
			</React.Fragment>
		)
	}
}

EventEditor.propTypes = {
	event: PropTypes.object,
	place: PropTypes.object,
	tags:  PropTypes.arrayOf(PropTypes.object)
};

EventEditor.defaultProps = {
	event: null,
	place: null,
	tags: []
};

function mapStateToProps(state, ownProps) {
	const {eventId, placeId} = ownProps.match.params;
	const loadingSelector = makeLoadingSelector(['events', 'places', 'tags']);
	return {
		event: state.events.byId[eventId],
		place: state.places.byId[placeId],
		tags: values(state.tags.byId),
		isLoading: loadingSelector(state)
	}
}

export default connect(mapStateToProps, {
	loadTagsIfNeeded,
	loadEventsIfNeeded,
	loadPlacesIfNeeded,
	updateEvent,
	updatePlace,
	postEvent,
	postPlace
})(EventEditor);