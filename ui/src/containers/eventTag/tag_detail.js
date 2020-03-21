import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadTagById, deleteTag } from '../../actions';
import PostContextMenu from '../../components/ui/menu/post_context_menu';
import TagDetailView from "../../components/tag/tag_detail_view";

class TagDetail extends React.Component {

	constructor(props) {
		super(props);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		const { tagId } = this.props.match.params;
		!this.props.tag && this.props.loadTagById(tagId);
	}

	onEdit = () => {
		const { tag, history } = this.props;
		history.push(`/tags/edit/${tag.id}`)
	};

	onDelete = () => {
		// todo: confirm message
		const { deleteTag, tag: { id } } = this.props;
		deleteTag(id);
	};

	//todo: loading animation
	render() {
		const { tag } = this.props;

		if (!tag) {
			return (<div/>)
		}

		return (
			<React.Fragment>
				<PostContextMenu
					onEdit={this.onEdit}
					onDelete={this.onDelete}
				/>
				<TagDetailView tag={tag} />
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ tags, auth }, ownProps) => {
	const { tagId } = ownProps.match.params;
	return {
		tag: tags.byId[tagId],
		currentUser: auth.user
	}
};

export default compose(
	withRouter,
	connect(
		mapStateToProps, {
			loadTagById,
			deleteTag
		})
)(TagDetail);