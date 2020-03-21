import React from 'react';
import { connect } from 'react-redux';

import { compose } from 'redux';
import { loadEventById, loadPlaceById, updateEvent } from '../../actions';
import { Row, Col } from 'reactstrap';
import PostImage from '../../components/post/post_image';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import PostContent from '../../components/post/post_content';
import Spinner from '../../components/ui/spinner';
import { isOwner, hasRole } from '../../utils/helpers';
import { ROLE_ADMIN } from '../../utils/constant';
import EventInfo from '../../components/event/event_info_bar';

import styles from './event_detail.module.css';
import {produce} from "immer";

class EventDetail extends React.Component {
    componentDidMount() {
        const { eventId, placeId } = this.props.match.params;
        !this.props.event && this.props.loadEventById(eventId);
        !this.props.place && this.props.loadPlaceById(placeId);

        this.onEdit = this.onEdit.bind(this);
        this.onApprove = this.onApprove.bind(this);
    }

    onEdit = () => {
        const { event, place } = this.props;
        this.props.history.push(`/events/edit/${event.id}/${place.id}`);
    };

    onApprove = () => {
        const { event } = this.props;
        const apiEvent = produce(event, draft => {
            draft.endTime = event.endTime.millis;
            draft.startTime = event.startTime.millis;
            draft.approved = true;
        });
        const successCallback = () => {
            this.props.history.push('/events/')
        };
        this.props.updateEvent(apiEvent, successCallback);
    };

    render = () => {
        const { event, place, currentUser } = this.props;

        if(!event || !place) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        // todo: extract to separate component and wrap with loading animation. Generify for Articles
        return (
            <div>
                {(/*isOwner(currentUser, event) ||*/ hasRole(currentUser, [ROLE_ADMIN])) && (
                    <PostContextMenu
                        onEdit={this.onEdit}
                        onApprove={!event.approved ? this.onApprove : null}
                    />
                )}

                <Row>
                    <Col>
                        <PostImage imgSrc={event.thumbnail} title={event.title} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <EventInfo event={event} place={place} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PostContent content={event.content} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = ({ events, places, auth }, ownProps) => {
    const { eventId, placeId } = ownProps.match.params;
    return {
        event: events.byId[eventId],
        place: places.byId[placeId],
        currentUser: auth.user
    }
};

export default compose(
    connect(mapStateToProps, { loadEventById, loadPlaceById, updateEvent })
)(EventDetail);