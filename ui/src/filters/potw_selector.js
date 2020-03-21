import { createSelector } from 'reselect';
import {values, orderBy} from 'lodash';

const getPhotosById = ({ photos }) => photos.byId;

export const selectCurrentPotw = createSelector(
  [ getPhotosById ],
  ( photosById ) => {
    // return orderBy(values(photosById), ['dateAdded'], ['asc'])[0]
    return values(photosById)[0]
  }
);


