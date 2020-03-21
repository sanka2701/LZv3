import React from 'react';
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Label,
  Input} from 'reactstrap';
import Slider from 'rc-slider';
import { FormattedMessage } from 'react-intl';
import MapFilter from '../../components/map/map_filter';


import 'rc-slider/assets/index.css';
import styles from './place_filter.module.css';

const PlaceFilter = ({ onPlaceFilterChanged, filter, markers })  => (
  <React.Fragment>
    <Row>
      <Col sm={12}>
        <Label>
          <FormattedMessage id={'place.choosePlace'} defaultMessage={'Choose a place on a map'}/>
        </Label>
        <MapFilter
          circleFilter={filter}
          markers={markers}
          onCircleSet={(circle) => {
            onPlaceFilterChanged(circle)
          }}
        />
      </Col>
    </Row>
    <Row>
      <Col sm={12}>
        <Label>
          <FormattedMessage id={'place.distance'} defaultMessage={'Distance'}/>
        </Label>
        <Row>
          <Col sm={3}>
            <Input
              value={filter.radius / 1000}
              onChange={value => onPlaceFilterChanged({ radius: value * 1000 })}
              disabled
            />
          </Col>
          <Col sm={9} className={styles.center}>
            <Slider
              min={1}
              max={20}
              step={0.1}
              value={filter.radius / 1000}
              onChange={value => onPlaceFilterChanged({ radius: value * 1000 })}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </React.Fragment>
);

PlaceFilter.propTypes = {
  onPlaceFilterChanged: PropTypes.func.isRequired
};

export default PlaceFilter;