import { createSelector } from 'reselect';

const getUsersById  = (users) => users.byId;
const getUserFilter = (users) => users.filter;

export const makeGetUsersByFilter = () => createSelector(
    [ getUsersById, getUserFilter, ],
    ( byId, filter ) => {
        return Object.values(byId).filter(( user ) => {
            let equals = true;
            // todo: filter text fields based on string proximity
            Object.keys(filter).forEach( key => {
              if(filter[key]){
                equals = equals && user[key] === filter[key];
              }
            });
            return equals;
        });
    }
);