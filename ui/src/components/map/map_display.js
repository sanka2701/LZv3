import React from 'react';
import PropTypes from "prop-types";
import MapWrapper from './map_wrapper';

const MapDisplay = ({onMarkerSet, selectedPlace, animation, ...mapProps}) => {
    const onItemLoad = (googleMaps, map, marker) => {
      marker.setAnimation(googleMaps.Animation[animation]);
    };

    const onMapLoad = (googleMaps, map) => {
      googleMaps.event.addListener(map, 'click', (event) => {
        const coordinates = {
          lat: event.latLng.lat(),
          lon: event.latLng.lng()
        };

        if (event.placeId) {
          event.stop();
        }
        onMarkerSet(coordinates, event.placeId);
      });
    };

    return (
      <React.Fragment>
        <MapWrapper
          center={selectedPlace}
          markers={[selectedPlace]}
          onMapLoad={onMapLoad}
          onItemLoad={onItemLoad}
          {...mapProps}
        />
      </React.Fragment>
    )
};

MapDisplay.propTypes = {
  onMarkerSet: PropTypes.func,
  selectedPlace : PropTypes.object,
  height: PropTypes.string,
  width: PropTypes.string,
  zoom: PropTypes.number,
  animation: PropTypes.string,
  disableDefaultUI: PropTypes.bool,
};

MapDisplay.defaultProps = {
  height: '300px',
  width: '100%',
  zoom: 12,
  animation: 'BOUNCE', // other options : '' // none, DROP
  disableDefaultUI: false,
  selectedPlace: {
    label: '',
    lat: '',
    lon: ''
  }
};

export default MapDisplay;