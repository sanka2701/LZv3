import { createSelector } from 'reselect';
import { isPointWithinCircle } from '../utils/helpers';
const getPlacesById   = (places) => places.byId;
const getPlacesFilter = (places) => places.filter;

export const makeGetPlacesByFilter = () => createSelector(
  [ getPlacesById, getPlacesFilter, ],
  ( byId, filter ) => {
    return Object.values(byId).filter(( place ) => {
      const {lat, lon} = place;
      return filter.isSet && filter.center && filter.radius
        ? isPointWithinCircle(filter.center, filter.radius, {lat, lon})
        : true;
    });
  }
);