import { createSelector } from 'reselect';
const getState = state => state;

const isInLoadingState = stateList => {
	return stateList.some(( stateFragment ) => {
		return stateFragment.hasOwnProperty('isLoading') && stateFragment.isLoading
	});
};

//todo: consider changing implementation in way that states of interests will be string names of states and they will be extacted correspondingly from state
export const makeLoadingSelector = statesOfInterest => createSelector(
	[ getState ],
	( state ) => {
		return statesOfInterest
			? isInLoadingState(statesOfInterest.map(stateName => state[stateName]))
			: isInLoadingState(Object.values(state))
	}
);