import {createSelector} from 'reselect/lib/index';
import {POSTS_PER_PAGE, UPCOMING_EVENTS_COUNT} from '../utils/constant';
import _, {chunk, map, orderBy} from 'lodash';
import {dateRangeOverlap, isPointWithinCircle} from "../utils/helpers";

const getCurrentPage = ({events}) => events.currentPage;
const getEvents = ({events}) => events.byId;
const getFilter = ({events}) => events.filter;
const getPlaces = ({places}) => places.byId;

export const makeEventsSelectorByApproval = approved => createSelector(
	[getEvents],
	(events) => {
		return Object.values(events).filter((event) => event.approved === approved);
	}
);

export const eventsPageCountSelector = createSelector(
	[makeEventsSelectorByApproval(true)],
	(approvedEvents) => Math.ceil(approvedEvents.length / POSTS_PER_PAGE)
);

export const upcomingEventsSelector = createSelector(
	[makeEventsSelectorByApproval(true)],
	(events) => {
		const futureEvents = events.filter(event =>
			dateRangeOverlap(event.startDate, event.endDate, new Date().setHours(0,0,0,0))
		);
		return orderBy(futureEvents, ['startDate'], ['asc']).slice(0, UPCOMING_EVENTS_COUNT);
	}
);

export const filteredEventsSelector = createSelector(
	[makeEventsSelectorByApproval(true), getFilter, getPlaces],
	(events, filter, places ) => {
		return ( events && Object.keys(places).length )
			? events.filter(event => {
				const {lat, lon} = places[event.placeId];

				let fits = true;
				// event is tagged with at least one tag selected on filter
				fits = fits && (
					filter.tags.length > 0
						? event.tags.some(tagId => map(filter.tags, 'id').includes(tagId))
						: true
				);
				// event is with filtered date range
				fits = fits && (
					filter.startDate || filter.endDate
						? dateRangeOverlap(event.startDate, event.endDate, filter.startDate, filter.endDate)
						: true
				);
				// event is within filtered area
				fits = fits && (
					filter.place.center && filter.place.radius
						? isPointWithinCircle(filter.place.center, filter.place.radius, {lat, lon})
						: true
				);

				return fits;
			})
			: {};
	}
);

export const currentPageEventsSelector = createSelector(
	[filteredEventsSelector, getCurrentPage],
	(approvedEvents, currentPage) => {
		const arr = chunk(approvedEvents, POSTS_PER_PAGE);
		return arr[currentPage - 1]
	}
);

export const placesOfFilteredEventsSelector = createSelector(
	[currentPageEventsSelector, getPlaces],
	(filteredEvents, places) => {
		if(filteredEvents && places) {
			var eventPlacesIds = filteredEvents.map(event => event.placeId);
			return Object.values(places).filter(place => eventPlacesIds.includes(place.id))
		} else {
			return []
		}
	}
);
