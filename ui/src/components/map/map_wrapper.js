import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map_c';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

const MapWrapper = ({
  circles, markers, onMapLoad, onItemLoad, height, width, center, ...mapProps
}) => {
  const getCircles = circleParams =>
    circleParams.filter(
      ({center}) => areCoordinatesValid(center)
    ).map( ({center, radius, circleProps}) => {
      return {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,

        onLoaded: onItemLoad,
        center: {lng: center.lon, lat: center.lat},
        radius,
        ...circleProps
      }
    });

  const getMarkers = markerParams =>
    markerParams.filter(
      (marker => areCoordinatesValid(marker))
    ).map( ({lon, lat, label, ...markerProps}) => {
      // label is extracted just to prevent passing to maps which would display it
      return {
        position: {lng: lon, lat: lat},
        onLoaded: onItemLoad,
        ...markerProps
      }
    });

  return (
    <div style={{height, width}}>
      <GoogleMap
        center={areCoordinatesValid(center) ? {lng: center.lon, lat: center.lat} : LM_GPS_COORDS}
        googleMaps={window.google.maps}
        gestureHandling={'cooperative'}
        circles={getCircles(circles)}
        markers={getMarkers(markers)}
        onLoaded={onMapLoad}
        {...mapProps}
      />
    </div>
  )
};

MapWrapper.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  markers : PropTypes.array,
  circles : PropTypes.array,
  center : PropTypes.object,
  zoom: PropTypes.number,

  onMapLoad: PropTypes.func.isRequired,
  onItemLoad: PropTypes.func.isRequired,
};

MapWrapper.defaultProps = {
  height: '300px',
  width: '100%',
  markers: [],
  circles: [],
  zoom: 12,
  center: null,
};

export default MapWrapper;