import React from 'react';
import FormAutocomplete from '../../components/ui/fields/form/form_autocomplete';
import { connect } from 'react-redux';
import { values } from 'lodash';
import {loadPlacesIfNeeded, selectPlace} from "../../actions";

class PlaceAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
    }

    componentDidMount() {
      this.props.loadPlacesIfNeeded();
    }

    onSuggestionSelect(placeId) {
      const { suggestions, formName } = this.props;
      this.props.selectPlace(suggestions[placeId], formName);
    }

    render() {
      const { suggestions } = this.props;

      return (
        <FormAutocomplete
          name={'label'}
          onSuggestionSelect={this.onSuggestionSelect}
          suggestions={values(suggestions)}
          messageId={'place.searchLabel'}
          defaultMessage={'Search for place'}
        />
      )
    }
}

const mapStateToProps = ({ places }) => {
  return{
		suggestions: places.byId
  }
};

export default connect(mapStateToProps, { loadPlacesIfNeeded, selectPlace })(PlaceAutocomplete);