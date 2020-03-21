import React from 'react';
import PropTypes from "prop-types";
import { Table } from 'reactstrap';
import { map } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import BorderCol from '../ui/content/bordered_content';
import MapDisplay from '../../components/map/map_display';

const PlaceList = ({ places, history }) => {
  const getTableRows = (places) => map(places, (place, index) => {
    return (
      <tr  key={'tag-mng-' + place.id} onClick={() => redirectToPlaceDetail(place.id)}>
        <th scope="row">
          {parseInt(index) + 1}
        </th>
        <td>
          <MapDisplay
            selectedPlace={place}
            animation={'NONE'}
            height={'150px'}
            width={'150px'}
            zoom={14}
            disableDefaultUI
          />
        </td>
        <td>
          {place.address}
        </td>
        <td>
          {place.label || '-' }
        </td>
      </tr>
    )
  });

  const redirectToPlaceDetail = (placeId) => history.push(`/places/${placeId}`);

  return (
    <BorderCol>
      <Table responsive hover striped>
        <thead>
        <tr>
          <th>#</th>
          <th>
            <FormattedMessage id={'place.map'} defaultMessage={'Map'}/>
          </th>
          <th>
            <FormattedMessage id={'place.address'} defaultMessage={'Address'}/>
          </th>
          <th>
            <FormattedMessage id={'place.label'} defaultMessage={'Label'}/>
          </th>
        </tr>
        </thead>
        <tbody>
        { getTableRows(places) }
        </tbody>
      </Table>
    </BorderCol>
  );
};

PlaceList.propTypes = {
  places: PropTypes.array.isRequired
};

PlaceList.defaultProps = {
  places: []
};

export default withRouter(PlaceList);