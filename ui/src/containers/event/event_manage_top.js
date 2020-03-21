import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {loadEventsIfNeeded, setEventPagination} from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import Pagination from '../../components/ui/pagination';
import EventManageList from '../../components/event/event_manage_list';
import {makeEventsSelectorByApproval} from "../../filters/events_selector";

const EventListWithSpinner = withLoadingAnimation(EventManageList);

class EventManageTop extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadEventsIfNeeded();
    }

    render() {
        const { isLoading, events } = this.props;

        return (
            <div>
                <EventListWithSpinner
                  isLoading={isLoading}
                  events={events} />
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    const getEventsByApproval = makeEventsSelectorByApproval(false);
    return {
        events: getEventsByApproval(state),
        isLoading: state.events.isLoading
    }
};

export default compose(
    connect(mapStateToProps, { loadEventsIfNeeded, setEventPagination })
)(EventManageTop);