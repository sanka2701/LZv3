import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadPlaceById, deletePlace } from '../../actions';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import PlaceDetailView from "../../components/place/place_detail_view";

class PlaceDetail extends React.Component {

  componentDidMount() {
    const { placeId } = this.props.match.params;
    !this.props.place && this.props.loadPlaceById(placeId);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit = () => {
  	const { place, history } = this.props;
		history.push(`/places/edit/${place.id}`)
  };

  onDelete = () => {
		// todo: confirm message
  	const { deletePlace, place: { id } } = this.props;
		deletePlace(id);
  };

  render() {
    const { place } = this.props;

    if (!place) {
      return (<div/>)
    }

    return (
      <React.Fragment>
        <PostContextMenu
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
        <PlaceDetailView place={place} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ places, auth }, ownProps) => {
  const { placeId } = ownProps.match.params;
  return {
    place: places.byId[placeId],
    currentUser: auth.user
  }
};

export default compose(
	withRouter,
	connect(
		mapStateToProps, {
			loadPlaceById,
			deletePlace
		})
)(PlaceDetail);