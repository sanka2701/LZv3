import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../../components/ui/spinner';
import {makeLoadingSelector} from "../../filters/loading_selector";
import {withRouter} from "react-router-dom";

const LoadingOverlay = ({ isLoading, children }) => {
	console.log('Loading', isLoading);
	return (
		<React.Fragment>
			{
				isLoading
					? <Spinner/>
					: children
			}
		</React.Fragment>
	)
};

const mapStateToProps = (state) => {
	const loadingSelector = makeLoadingSelector(['events', 'places']);
	return {
		isLoading: loadingSelector(state)
	}
};

export default withRouter(connect(mapStateToProps)(LoadingOverlay));