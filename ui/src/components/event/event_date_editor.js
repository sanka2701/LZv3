import React from 'react';
import { Row, Col } from 'reactstrap';
import { required } from '../../utils/valdiators';
import { timeToMilliseconds } from '../../utils/helpers';
import FormDateTimePicker from '../ui/fields/form/form_date_time_picker';
import FormDropdownList from '../ui/fields/form/form_dropdown_list';

const getTimeSteps = () => {
    const timeOptions = [];
    for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes+=15) {
            timeOptions.push({
                label: ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2),
                millis: timeToMilliseconds(hours, minutes)
            })
        }
    }
    return timeOptions;
};

const PlaceDateEditor = () => {
    return (
        <div>
            <Row style={{marginTop: '20px', marginBottom: '10px'}}>
                <Col sm='6'>
                    <FormDateTimePicker
                        name="startDate"
                        validate={[required]}
                        messageId={'event.startDate'}
                        defaultMessage='Select start day'
                    />
                </Col>

                <Col sm='6'>
                    <FormDateTimePicker
                        name="endDate"
                        validate={[required]}
                        messageId={'event.endDate'}
                        defaultMessage='Select end day'
                    />
                </Col>
            </Row>

            <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                <Col>
                    <FormDropdownList
                        name='startTime'
                        data={getTimeSteps()}
                        validate={[required]}
                        messageId={'event.startTime'}
                        defaultMessage='Select start time'
                    />
                </Col>
                <Col>
                    <FormDropdownList
                        name='endTime'
                        data={getTimeSteps()}
                        validate={[required]}
                        messageId={'event.endTime'}
                        defaultMessage='Select end time'
                    />
                </Col>
            </Row>
        </div>
    )
};

export default PlaceDateEditor;