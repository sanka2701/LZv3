import React from 'react';
import MapDisplay from '../map/map_display';
import { Row, Col, Label, Button, Collapse } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { FaClock, FaCalendar } from 'react-icons/fa'

import './event_info_bar_styles.css';

export default class EventInfoBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const { event } = this.props;
        const startDate = new Date(event.startDate);

        return (
            <div className={'event-info-bar'}>
                <Row>
                    <Col sm='4'>
                        <Label>
                            <FaCalendar size={32}/>
                        </Label>
                        <Label>
                            {`${startDate.getDay()}.${startDate.getMonth()}.${startDate.getFullYear()}`}
                        </Label>
                    </Col>
                    <Col sm='4'>
                        <Label>
                            <FaClock size={32}/>
                        </Label>
                        <Label className={'info-data'}>
                            {`${event.startTime.label} - ${event.endTime.label}`}
                        </Label>
                    </Col>
                    <Col sm='4'>
                        <Button color="primary" onClick={this.toggle}>
                            <FormattedMessage id='event.showMap' defaultMessage='Show Map'/>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {this.props.place.address}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Collapse isOpen={this.state.collapse}>
                            <MapDisplay selectedPlace={this.props.place}/>
                        </Collapse>
                    </Col>
                </Row>
            </div>
        )
    }
}