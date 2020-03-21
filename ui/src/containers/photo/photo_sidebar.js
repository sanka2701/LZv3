import React from 'react';
import { connect } from 'react-redux';
import { loadAllPhotos } from '../../actions';
import {selectCurrentPotw} from "../../filters/potw_selector";

//todo: style the component and display info
class PhotoSidebar extends React.Component {
    componentDidMount() {
        this.props.loadAllPhotos();
    }

    render() {
        const { photo } = this.props;

        if(!photo) {
            return (<div></div>);
        }

        return (
            <div>
                <img src={photo.photoUrl} style={{maxWidth: '100%'}} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        photo: selectCurrentPotw(state)
    }
};

export default connect(mapStateToProps, { loadAllPhotos } )(PhotoSidebar)