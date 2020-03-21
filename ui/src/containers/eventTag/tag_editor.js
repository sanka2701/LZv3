import React from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import {Row, Col} from 'reactstrap';
import {required} from '../../utils/valdiators';
import FormInput from '../../components/ui/fields/form/form_input';
import BorderCol from '../../components/ui/content/bordered_content';
import { reduxForm } from 'redux-form';
import {postTag, updateTag, loadTagById} from "../../actions";
import PostContextMenu from "../../components/ui/menu/post_context_menu";

class TagEditor extends React.Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentDidMount() {
		const { tagId } = this.props.match.params;
		tagId && !this.props.tag && this.props.loadTagById(tagId);
	}

	onSubmit = (tag) => {
		const { updateTag, postTag, history } = this.props;
		const successCallBack = () => {
			history.push('/tags')
		};

		tag.id
			? updateTag(tag, successCallBack)
			: postTag(tag, successCallBack);
	};

	onCancel() {
		this.props.history.goBack();
	}

	render() {
		const {handleSubmit, reset} = this.props;

		return (
			<React.Fragment>
				<PostContextMenu
					onSubmit={handleSubmit(this.onSubmit)}
					onCancel={this.onCancel}
					onReset={reset}
				/>
				<BorderCol sm={12}>
					<form>
						<Row>
							<Col>
								<FormInput
									messageId={'tag.label'}
									defaultMessage={'Label'}
									name={'label'}
									validate={[required]}
								/>
							</Col>
						</Row>
					</form>
				</BorderCol>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({tags}, ownProps) => {
	const { tagId } = ownProps.match.params;
	const editedTag = tags.byId[tagId];

	return {
		initialValues: editedTag,
		tag: editedTag
	}
};

export default compose(
	connect(mapStateToProps, {
		postTag,
		updateTag,
		loadTagById
	}),
	reduxForm({form: 'create_tag'}),
)(TagEditor);