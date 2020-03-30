import React from 'react';
import PropTypes from "prop-types";
import MapWrapper from './map_wrapper';

const MapPicker = ({onMarkerSet, selectedPlace, ...mapProps}) => {
    const onItemLoaded = (googleMaps, map, marker) => {
        marker.setAnimation(googleMaps.Animation.BOUNCE);
        map.panTo({lng: selectedPlace.lon, lat: selectedPlace.lat});
        googleMaps.event.addListener(marker, 'click', function(event) {
            marker.setMap(null);
            onMarkerSet({ lat: '', lon: '' }, null);
        });
    };

    const onMapLoaded = (googleMaps, map) => {
        googleMaps.event.addListener(map, 'click', (event) => {
            map.panTo(event.latLng);
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
                onMapLoad={onMapLoaded}
                onItemLoad={onItemLoaded}
                {...mapProps} />
        </React.Fragment>
    )
};

MapPicker.propTypes = {
    onMarkerSet: PropTypes.func.isRequired,
    selectedPlace : PropTypes.object
};

MapPicker.defaultProps = {
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default MapPicker;