import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Collapse} from 'reactstrap';
import { loadTags, setTagFilter, resetTagFilter } from '../../actions';
import { makeGetTagsByFilter } from '../../filters/tag_filter';
import TagList from '../../components/tag/tag_list';
import TagFilter from '../../components/tag/tag_filter';
import FilterMenu from "../../components/ui/menu/filter_menu";
import BorderCol from '../../components/ui/content/bordered_content';

class TagTop extends React.Component {
	constructor(props) {
		super(props);
		this.onFilterChange = this.onFilterChange.bind(this);
		this.onChangeFilterVisibility = this.onChangeFilterVisibility.bind(this);
		this.onFilterReset = this.onFilterReset.bind(this);
		this.onAddTag = this.onAddTag.bind(this);
		this.state = {
			isFilterShown: true
		}
	}

  componentDidMount() {
    this.props.loadTags();
  }

  onFilterChange = (filter) => {
  	const { setTagFilter } = this.props;
  	filter.isSet = !!filter.searchString;
		setTagFilter(filter);
	};

	onChangeFilterVisibility = () => this.setState({isFilterShown: ! this.state.isFilterShown});

	onFilterReset = () => this.props.resetTagFilter();

	onAddTag = () => this.props.history.push(`/tags/edit`);

  render = () => {
    const { isLoading, tags, filter } = this.props;
    const { isFilterShown } = this.state;
    // todo: add spinning animation
    return (
      <Row>
				<BorderCol sm={12}>
					<FilterMenu
						onShow={this.onChangeFilterVisibility}
						onReset={this.onFilterReset}
						onAdd={this.onAddTag}
					/>
					<Collapse isOpen={isFilterShown}>
						<TagFilter filter={filter} onFilterChanged={this.onFilterChange} />
					</Collapse>
				</BorderCol>
        <TagList tags={tags} />
      </Row>
    )
  }
}

const mapStateToProps = ({ tags }) => {
	const getTagsByFilter = makeGetTagsByFilter();
  return {
    isLoading: tags.isLoading,
		filter: tags.filter,
    tags : getTagsByFilter(tags),
  }
};

export default compose(
	withRouter,
	connect(
		mapStateToProps, {
			loadTags,
			setTagFilter,
			resetTagFilter
		})
)(TagTop);