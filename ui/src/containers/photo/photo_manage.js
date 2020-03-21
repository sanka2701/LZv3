import React from 'react';
import { connect } from 'react-redux';
import PhotoEditForm from './photo_edit_form';
import { postPhoto, updatePhoto, loadPhotoById } from '../../actions';
import {selectCurrentPotw} from "../../filters/potw_selector";
import withLoadingAnimation from "../../components/ui/content/withLodingAnimation";

const PhotoEditFormWithSpinner = withLoadingAnimation(PhotoEditForm);

class PhotoManage extends React.Component {
    onCancel = () => {
        this.props.history.push('/events');
    };

    onSubmit = (photo) => {
        const successCallback = () => {
            this.props.history.push('/events/')
        };

        photo.id
            ? this.props.updatePhoto(photo, successCallback)
            : this.props.postPhoto(photo, successCallback);
    };

    render = () => {
        const { photo, isLoading } = this.props;

        return (
            <React.Fragment>
                <PhotoEditFormWithSpinner
                    isLoading={isLoading}
                    initialValues={photo}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        photo: selectCurrentPotw(state),
        isLoading: state.photos.isLoading
    }
};

export default connect(mapStateToProps, { postPhoto, updatePhoto, loadPhotoById })(PhotoManage);
