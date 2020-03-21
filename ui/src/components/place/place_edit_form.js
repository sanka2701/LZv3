import React from 'react';
import {Row, Col} from 'reactstrap';
import {required} from '../../utils/valdiators';
import MapEditor from '../../containers/map/map_editor';
import FormInput from '../ui/fields/form/form_input';
import PlaceAutocomplete from '../../containers/place/place_autocomplete';
import {connect} from "react-redux";
import {formValueSelector} from "redux-form";

const PlaceEditForm = ({formName, currentPlace}) => (
	<React.Fragment>
		<Row style={{marginTop: '20px', marginBottom: '10px'}}>
			<Col sm="12">
				<PlaceAutocomplete formName={formName}/>
			</Col>
		</Row>

		<Row style={{marginTop: '10px', marginBottom: '10px'}}>
			<Col sm="12">
				<FormInput
					messageId={'place.address'}
					defaultMessage={'Address'}
					name={'address'}
					validate={[required]}
				/>
			</Col>
		</Row>

		<Row style={{marginTop: '10px', marginBottom: '10px'}}>
			<Col sm="6">
				<FormInput
					messageId={'place.lat'}
					defaultMessage={'Latitude'}
					name={'lat'}
					validate={[required]}
					disabled={true}
				/>
			</Col>
			<Col sm="6">
				<FormInput
					messageId={'place.lon'}
					defaultMessage={'Longitude'}
					name={'lon'}
					validate={[required]}
					disabled={true}
				/>
			</Col>
		</Row>

		<MapEditor
			formName={formName}
			selectedPlace={currentPlace}
		/>
	</React.Fragment>
);

const mapStateToProps = (state, ownProps) => {
	const selector = formValueSelector(ownProps.formName);
	return {
		currentPlace: selector(state, 'place')
	}
};

export default connect(mapStateToProps)(PlaceEditForm);
