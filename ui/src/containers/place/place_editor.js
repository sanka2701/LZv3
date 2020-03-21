import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PlaceEditForm from '../../components/place/place_edit_form';
import BorderCol from '../../components/ui/content/bordered_content';
import { reduxForm, FormSection } from 'redux-form';
import {Button} from 'reactstrap';
import {loadPlaceById, postPlace, updatePlace} from "../../actions";
import PostContextMenu from "../../components/ui/menu/post_context_menu";

//todo: finish submitting
class PlaceEditor extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    const { placeId } = this.props.match.params;
    placeId && !this.props.place && this.props.loadPlaceById(placeId);
  }

  onCancel = () => {
    this.props.history.goBack();
  };

  onSubmit = ({place}) => {
    const {postPlace, updatePlace} = this.props;
    const successCallback = () => {
      this.props.history.push(`/places/`)
    };

    place.id
      ? updatePlace(place, successCallback)
  		: postPlace(place, successCallback);
  };

  render = () => {
		const {handleSubmit, reset} = this.props;

    return (
      <React.Fragment>
        <PostContextMenu
          onSubmit={handleSubmit(this.onSubmit)}
          onCancel={this.onCancel}
          onReset={reset}
        />
        <BorderCol>
          <form>
            <FormSection name='place'>
              <PlaceEditForm formName='create_place'/>
            </FormSection>
          </form>
        </BorderCol>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({places}, ownProps) => {
  const { placeId } = ownProps.match.params;
  const place = places.byId[placeId];
  return {
    initialValues: {place},
    place
  }
};

export default compose(
	connect(mapStateToProps, { postPlace, updatePlace, loadPlaceById }),
  reduxForm({form: 'create_place'})
)(PlaceEditor);