import { createSelector } from 'reselect';
const getState = state => state;

const isInLoadingState = stateList => {
	return stateList.some(( stateFragment ) => {
		return stateFragment.hasOwnProperty('isLoading') && stateFragment.isLoading
	});
};

export const makeLoadingSelector = statesOfInterest => createSelector(
	[ getState ],
	( state ) => {
		return statesOfInterest
			? isInLoadingState(statesOfInterest.map(stateName => state[stateName]))
			: isInLoadingState(Object.values(state))
	}
);