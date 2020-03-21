import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
	setEventPagination,
	loadEventsIfNeeded,
	loadPlacesIfNeeded,
	invalidateEvents,
	invalidatePlaces
} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import EventFilter from './event_filter';
import PostList from '../../components/post/post_list';
import {Row} from "reactstrap";
import {
	currentPageEventsSelector,
	eventsPageCountSelector,
} from "../../filters/events_selector";
import {makeLoadingSelector} from "../../filters/loading_selector";
import {POST_TYPE_EVENT} from "../../utils/constant";

const EventListWithSpinner = withLoadingAnimation(PostList);

class EventTop extends React.Component {
	constructor(props) {
		super(props);
		this.onPaginationChange = this.onPaginationChange.bind(this);
		this.onInvalidateEvents = this.onInvalidateEvents.bind(this);
	}

	componentDidMount() {
	  // in order to filter places, both places and events need to be pre loaded for children components
		this.props.loadEventsIfNeeded();
		this.props.loadPlacesIfNeeded();
	}

	componentWillUpdate(nextProps, nextState, nextContext) {
		//todo: try to leverage from this loop instead of onInvalidateEvents to avoid passing down the function to filter
		//  add didInvalidate property from places and events reducers and check for its change
		debugger;
	}

	onPaginationChange(pageIndex) {
		this.props.setEventPagination(pageIndex);
	}

	onInvalidateEvents = () => {
		this.props.invalidateEvents();
		this.props.invalidatePlaces();
		this.props.loadEventsIfNeeded();
		this.props.loadPlacesIfNeeded();
	};

	render() {
		const {pageCount, currentPage, isLoading, events} = this.props;

		return (
			<React.Fragment>
				<Row>
					<EventFilter onInvalidate={this.onInvalidateEvents}/>
				</Row>
				<div>
					<EventListWithSpinner
						isLoading={isLoading}
						posts={events}
						type={POST_TYPE_EVENT}
					/>
					<Pagination
						activePage={currentPage}
						pageCount={pageCount}
						onPageSelect={this.onPaginationChange}
					/>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	const loadingSelector = makeLoadingSelector(['events', 'places']);
	return {
		isLoading: loadingSelector(state),
		events: currentPageEventsSelector(state),
    pageCount: eventsPageCountSelector(state),
    currentPage: state.events.currentPage,
	}
};

export default compose(
	connect(mapStateToProps, {
		loadEventsIfNeeded,
		setEventPagination,
		loadPlacesIfNeeded,
		invalidateEvents,
		invalidatePlaces,
	}),
	withSideBar
)(EventTop);