import React from 'react';
import PropTypes from "prop-types";
import MapWrapper from './map_wrapper';

const MapFilter = ({onCircleSet, onMarkerSet, markers, circleFilter, ...mapProps}) => {
  const onItemLoad = (googleMaps, map, item) => {
    if (item.type === 'Circle') {
        googleMaps.event.addListener(item, 'click', () => {
          onCircleSet({center: null});
        });
    }
  };

  const onMapLoaded = (googleMaps, map) => {
    googleMaps.event.addListener(map, 'click', (event) => {
      map.panTo(event.latLng);
      const center = {
        lat: event.latLng.lat(),
        lon: event.latLng.lng()
      };

      onCircleSet({center});
    });
  };

  return (
    <React.Fragment>
      <MapWrapper
                 circles={[circleFilter]}
                 markers={markers}
                 onItemLoad={onItemLoad}
                 onMapLoad={onMapLoaded}
                 disableDefaultUI
                 {...mapProps}
      />
    </React.Fragment>
  )
};

MapFilter.propTypes = {
  onCircleSet: PropTypes.func,
  onMarkerSet: PropTypes.func,
  markers : PropTypes.array,
  circleFilter : PropTypes.object,
};

MapFilter.defaultProps = {
  markers: [],
  circleFilter: null,
};

export default MapFilter;