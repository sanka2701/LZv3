import { createSelector } from 'reselect';
import { stripDiacritics } from '../utils/helpers';
import { STRING_PROXIMITY_THRESHOLD } from "../utils/constant";
import levenshtein from 'js-levenshtein';

const getTagsById   = (places) => places.byId;
const getTagsFilter = (places) => places.filter;

export const makeGetTagsByFilter = () => createSelector(
	[ getTagsById, getTagsFilter, ],
	( byId, filter ) => {
		return Object.values(byId).filter(( tag ) => {
			const label = stripDiacritics(tag.label).toLowerCase();
			const {searchString} = filter;
			const score = levenshtein(label, searchString);

			return filter.isSet
				? label.includes(searchString) || score < STRING_PROXIMITY_THRESHOLD
				: true;
		});
	}
);