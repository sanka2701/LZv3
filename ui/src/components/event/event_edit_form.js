import React from 'react';
import {reduxForm, FormSection} from 'redux-form';
import {required, requiredArray} from "../../utils/valdiators";
import {Container, Row, Col} from 'reactstrap';
import EventDateEditor from './event_date_editor';
import PlaceEditForm from '../place/place_edit_form';
import FormInput from '../ui/fields/form/form_input';
import FormMulstiselect from '../ui/fields/form/form_multiselect';
import FormFileUpload from '../ui/fields/form/form_file_upload';
import FormContentEditor from '../ui/fields/form/form_content_editor';
import PostContextMenu from '../ui/menu/post_context_menu';
import BorderCol from '../ui/content/bordered_content';

const EventEditForm = ({
 	tags,
 	handleSubmit,
 	editMode,
 	change,
 	reset,
 	onCancel,
 	onSubmit,
 	onApprove,
}) => (
	<div>
		<Container>
			<PostContextMenu
				onSubmit={handleSubmit(onSubmit)}
				onReset={reset}
				onCancel={onCancel}
				onApprove={editMode ? onApprove : null}
			/>

			<BorderCol>
				<form>
					<Row>
						<Col>
							<FormInput
								messageId={'event.title'}
								defaultMessage={'Event title'}
								name={'title'}
								validate={[required]}
							/>
						</Col>
					</Row>

					<Row>
						<Col>
							<FormMulstiselect
								messageId={'event.tags'}
								defaultMessage={'Tags'}
								name={'tags'}
								validate={[requiredArray]}

								data={tags}
								valueField='id'
								textField='label'
							/>
						</Col>
					</Row>

					<Row>
						<Col sm='4'>
							<FormFileUpload
								name={'thumbnail'}
								validate={[required]}
							/>
						</Col>
						<Col sm='8' className={"align-self-center"}>
							<EventDateEditor/>
						</Col>
					</Row>

					<FormSection name='place'>
						<PlaceEditForm
							formName='create_event'
						/>
					</FormSection>

					<Row>
						<Col>
							<FormContentEditor
								name={'content'}
								validate={[required]}
							/>
						</Col>
					</Row>
				</form>
			</BorderCol>

			<PostContextMenu
				onSubmit={handleSubmit(onSubmit)}
				onReset={reset}
				onCancel={onCancel}
				onApprove={editMode ? onApprove : null}
			/>
		</Container>
	</div>
);

function validate(values) {
	const errors = {};
	if (values.time) {
		if (values.time.startDate &&
			values.time.endDate &&
			values.time.startDate > values.time.endDate
		) {
			debugger;
			errors.time = {};
			errors.time.startDate = 'error.time.startDateBeforeEnd';
		}
	}

	if (!values.place || !values.place.label) {
		errors.place = {};
		errors.place.label = 'error.field.required'
	}

	return errors;
}

export default reduxForm({form: 'create_event', validate})(EventEditForm);