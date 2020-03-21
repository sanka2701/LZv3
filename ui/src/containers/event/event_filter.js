import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Label, Collapse} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import {resetEventFilter, setEventFilter, loadTags} from "../../actions";
import PlaceFilter from "../../components/place/place_filter";
import {DateTimePicker, Multiselect} from "react-widgets";
import {FormattedMessage} from "react-intl";
import _ from 'lodash';
import FilterMenu from "../../components/ui/menu/filter_menu";

class EventFilter extends React.Component {
	constructor(props) {
		super(props);
		this.onChangeFilterVisibility = this.onChangeFilterVisibility.bind(this);
		this.onChangeMapVisibility = this.onChangeMapVisibility.bind(this);
		this.onFilterReset = this.onFilterReset.bind(this);
		this.placeFilterChanged = this.placeFilterChanged.bind(this);
		this.filterChanged = this.filterChanged.bind(this);
		this.state = {
			isFilterShown: true,
			isMapShown: false,
		}
	}

	componentDidMount = () => {
		this.props.loadTags();
	};

	placeFilterChanged = (place) => {
		const {filter} = this.props;
		this.props.setEventFilter({
			place: {
				...filter.place,
				...place
			}
		});
	};

	filterChanged = (filter) => {
		this.props.setEventFilter(filter);
	};

	onChangeFilterVisibility = () => {
		this.setState({isFilterShown: !this.state.isFilterShown});
	};

	onChangeMapVisibility = () => {
		this.setState({isMapShown: !this.state.isMapShown});
	};

	onFilterReset = () => {
		this.props.resetEventFilter();
	};

	render() {
		const {filter, tags, onInvalidate} = this.props;

		return (
			<BorderCol sm={12}>
				<Row>
					<Col>
						<FilterMenu
							onShow={this.onChangeFilterVisibility}
							onMapShow={this.onChangeMapVisibility}
							onReset={this.onFilterReset}
							onInvalidate={onInvalidate}
						/>
					</Col>
				</Row>

				<Collapse isOpen={this.state.isFilterShown}>
					<Row>
						<Col sm={12}>
							<Label>
								<FormattedMessage id={'event.tags'} defaultMessage={'Tags'}/>
							</Label>
							<Multiselect
								value={filter.tags}
								onChange={(value) => this.filterChanged({tags: value})}
								data={tags}
								valueField='id'
								textField='label'
							/>
						</Col>
					</Row>

					<Row style={{marginTop: '20px', marginBottom: '10px'}}>
						<Col sm='6'>
							<Label>
								<FormattedMessage id={'event.from'} defaultMessage={'From'}/>
							</Label>
							<DateTimePicker
								onChange={(val) => {
									val && this.filterChanged({startDate: val.getTime()})
								}}
								onBlur={() => this.filterChanged({startDate: filter.startDate})}
								format="DD MMM YYYY"
								time={false}
								value={filter.startDate ? new Date(filter.startDate) : null}
							/>
						</Col>

						<Col sm='6'>
							<Label>
								<FormattedMessage id={'event.to'} defaultMessage={'To'}/>
							</Label>
							<DateTimePicker
								onChange={(val) => {
									val && this.filterChanged({endDate: val.getTime()})
								}}
								onBlur={() => this.filterChanged({endDate: filter.endDate})}
								format="DD MMM YYYY"
								time={false}
								value={filter.endDate ? new Date(filter.endDate) : null}
							/>
						</Col>
					</Row>
					<Collapse isOpen={this.state.isMapShown}>
						<PlaceFilter onPlaceFilterChanged={this.placeFilterChanged} filter={filter.place}/>
					</Collapse>
				</Collapse>
			</BorderCol>
		)
	}
}

const mapStateToProps = ({events: {filter}, tags}) => {
	return {
		filter,
		tags: _.values(tags.byId),
	}
};

export default connect(
	mapStateToProps, {
		setEventFilter,
		resetEventFilter,
		loadTags,
	})(EventFilter);

