import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { selectGooglePOI, selectPlace } from '../../actions/index';
import { Row, Col } from 'reactstrap';
import MapPicker from '../../components/map/map_picker'

class MapEditor extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            selectedPlace: props.selectedPlace
        }
    }

    componentWillReceiveProps({selectedPlace}) {
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
        }
    }

    setMarker(coordinates, placeid) {
        const {formName, selectedPlace, keepIdOnPick} = this.props;
        this.setState(prevState => ({
            selectedPlace: {
                ...prevState.selectedPlace,
                ...coordinates
            }
        }));

        const place = {
            ...coordinates,
            address: '',
            label: '',
            id: keepIdOnPick
              ? selectedPlace.id
              : null
        };

        placeid ?
            this.props.selectGooglePOI(placeid) :
            this.props.selectPlace(place, formName);
    }

    render() {
        return (
            <div>
                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <MapPicker
                            onMarkerSet={this.setMarker}
                            selectedPlace={this.state.selectedPlace}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

MapEditor.propTypes = {
    formName: PropTypes.string,
    selectedPlace : PropTypes.object,
    keepIdOnPick: PropTypes.bool
};

MapEditor.defaultProps = {
    keepIdOnPick: false,
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default connect(null, { selectGooglePOI, selectPlace })(MapEditor);
