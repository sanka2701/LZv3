import axios from 'axios';
import {ROOT_URL, SERVER_URL_PLACEHOLDER} from './constant';
import _, {forEach} from "lodash";
import HtmlContentPostprocess from "./html_content_postprocess";

export const hasRole = (user, roles) => {
    return user && roles.includes(user.role);
};

export const isOwner = (user, event) => {
    return user && event && user.id === event.ownerId;
};

export const replaceServerUrlPlaceholder = serverUrl => {
	const regex = new RegExp(SERVER_URL_PLACEHOLDER, 'g');
	return serverUrl.replace(regex, ROOT_URL);
};


export const postToFormData = async ({ thumbnail, ...post }, type) => {
	const processor = new HtmlContentPostprocess();
	const files = await processor.getContentFiles(post.content);

	const formData = new FormData();
	formData.append(type, JSON.stringify(post));
	forEach(files, ( file, url ) => {
		formData.append('fileUrls', url);
		formData.append('files', file);
	});
	thumbnail instanceof File
		? formData.append('thumbnail', thumbnail)
		: post.thumbnail = thumbnail;

	return formData;
};

export const stripDiacritics = sting => sting.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

export const radiusToDegreeDistance = (radius) => radius / 78.71 * 0.001;

export const dateRangeOverlap = (eventStart, eventEnd, filterStart, filterEnd) => {
	if(!filterStart) {
		return (eventStart <= filterEnd)
	}

	if(!filterEnd) {
		return (eventEnd >= filterStart)
	}

	// todo: handle on filter ui
	if(filterStart > filterEnd) {
		return true;
	}

	return (eventStart <= filterEnd) && (eventEnd >= filterStart)
};

export const isPointWithinCircle = (center, radius, point) => {
	const centerXY = {x: center.lon, y: center.lat };
	const pointXY  = {x: point.lon, y: point.lat };
	const radiusDeg= radiusToDegreeDistance(radius);

	const calc = Math.sqrt((pointXY.x-centerXY.x)*(pointXY.x-centerXY.x) + (pointXY.y-centerXY.y)*(pointXY.y-centerXY.y));
	return calc < radiusDeg;
};

export const areCoordinatesValid = (coords) => {
    return coords
        && coords.lat
        && coords.lon
        && typeof (coords.lat) === 'number'
        && typeof (coords.lon) === 'number';
};

export const timeToMilliseconds = (hours, minutes) => (minutes * 60000 + hours * 3600000);

export const millisecondsToTime = (millis) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = (millis % 3600000) / 60000;
    return hours + ':' + minutes;
};

export const postWithResult = async (request) => {
    const {endpoint, payload, params, successCallback} = request;
    let result;
    await axios.post(`${ROOT_URL}/${endpoint}`, payload, {params})
        .then( response => {
            successCallback && successCallback();
            result = response.data;
        })
        .catch(err => {
            debugger;
        });
    return result;
};