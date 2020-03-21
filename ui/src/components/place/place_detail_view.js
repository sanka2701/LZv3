import React from 'react';
import { Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import BorderCol from '../../components/ui/content/bordered_content';
import ViewText from '../../components/ui/fields/view/view_text';
import MapDisplay from '../../components/map/map_display';

const PlaceDetailView = ({place}) => (
  <BorderCol>
    <Row>
      <Col>
        <FormGroup>
          <Label>
            <FormattedMessage id={'place.label'} defaultMessage={'Label'}/>
          </Label>
          <ViewText>
            {place.label}
          </ViewText>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup>
          <Label>
            <FormattedMessage id={'place.address'} defaultMessage={'Address'}/>
          </Label>
          <ViewText>
            {place.address}
          </ViewText>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <FormGroup>
          <Label>
            <FormattedMessage id={'place.lat'} defaultMessage={'Latitude'}/>
          </Label>
          <ViewText>
            {place.lat}
          </ViewText>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>
            <FormattedMessage id={'place.lon'} defaultMessage={'Longitude'}/>
          </Label>
          <ViewText>
            {place.lon}
          </ViewText>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <MapDisplay
          selectedPlace={place}
          animation={''}
          disableDefaultUI
        />
      </Col>
    </Row>
  </BorderCol>
);



export default PlaceDetailView;