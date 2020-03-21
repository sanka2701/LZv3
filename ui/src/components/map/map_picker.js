import React from 'react';
import PropTypes from "prop-types";
import GoogleMap from '../external/google_map';
import { areCoordinatesValid } from '../../utils/helpers';
import { LM_GPS_COORDS } from '../../utils/constant';

//todo: due to lot of shared code with map_display.js merge to single file
const MapPicker = ({onMarkerSet, selectedPlace}) => {
    const getCoordinates = () => {
        // debugger;
        return areCoordinatesValid(selectedPlace) ? [
            {
                title: selectedPlace.label || "default",
                position: {lng: selectedPlace.lon, lat: selectedPlace.lat},
                onLoaded: (googleMaps, map, marker, callback) => {
                    marker.setAnimation(googleMaps.Animation.BOUNCE);
                    map.panTo({lng: selectedPlace.lon, lat: selectedPlace.lat});
                    googleMaps.event.addListener(marker, 'click', function(event) {
                        marker.setMap(null);
                        callback({ lat: '', lon: '' }, null);
                    });
                }
            }
        ] : [];
    };

    return (
        <div style={{height: '300px'}}>
            <GoogleMap googleMaps={window.google.maps}
                       center={LM_GPS_COORDS}
                       zoom={12}
                       callback={onMarkerSet}
                       gestureHandling={'cooperative'}
                       coordinates={getCoordinates()}
                       onLoaded={(googleMaps, map, callback) => {
                           googleMaps.event.addListener(map, 'click', (event) => {
                               map.panTo(event.latLng);
                               const coordinates = {
                                   lat: event.latLng.lat(),
                                   lon: event.latLng.lng()
                               };

                               if (event.placeId) {
                                   event.stop();
                               }
                               callback(coordinates, event.placeId);
                           });
                       }}
            />
        </div>
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