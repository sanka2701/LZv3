import React from 'react';
import PropTypes from "prop-types";

const inlineStyles = {
  position: "relative",
  overflow: "hidden",
  height: "100%",
  width: "100%",
};

const ITEM_TYPE = {
  MARKER: 'Marker',
  CIRCLE: 'Circle'
};

class GoogleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      markerCache: new Map(),
      areaCache: new Map()
    }
  }

  componentDidMount() {
    const {circles, markers, googleMaps, onLoaded, ...mapProps} = this.props;

    const map = new googleMaps.Map(this.ref_map, {
      ...mapProps,
    });

    this.setState({map}, () => {
      this.update(circles, markers);
    });

    if (onLoaded) {
      onLoaded(googleMaps, map)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.circles) !== JSON.stringify(prevProps.circles)
      || JSON.stringify(this.props.markers) !== JSON.stringify(prevProps.markers)
    ) {
      this.update(this.props.circles, this.props.markers);
    }
  }

  update(circles, markers) {
    const diff = {};

    diff.circles = this.getCircleDiff(circles);
    diff.markers = this.getMarkersDiff(markers);

    diff.circles && this.updateMapCircles(diff);
    diff.markers && this.updateMapMarkers(diff);
  }

  getMarkersDiff(markers) {
    if(!markers) {
      return null;
    }
    const diff = {};
    const { markerCache } = this.state;
    const IDedMarkers = markers.map(
      marker => this.destructureParamMarker(marker)
    );

    diff.added = IDedMarkers.filter(
      marker => !markerCache.has(marker.id)
    );

    diff.removedIds = !IDedMarkers.length
      ? [...markerCache.keys()]
      : [...markerCache.keys()].filter(
        markerId => {
          return !IDedMarkers.some(marker => marker.id === markerId);
        }
      );

    return diff;
  }

  getCircleDiff(circles) {
    if(!circles) {
      return null;
    }
    const diff = {};
    const { areaCache } = this.state;
    const IDedCircles = circles.map(
      circle => this.destructureParamCircle(circle)
    );

    diff.added = IDedCircles.filter(
      circle => !areaCache.has(circle.id)
    );

    diff.updated = IDedCircles.filter(
      circle => areaCache.has(circle.id) && areaCache.get(circle.id).radius !== circle.radius
    );

    diff.removedIds = !IDedCircles.length
      ? [...areaCache.keys()]
      : [...areaCache.keys()].filter(
        circleId => {
          return !IDedCircles.some(circle => circle.id === circleId);
        }
      );

    return diff;
  }

  updateMapCircles(diff) {
    const { areaCache } = this.state;

    diff.circles.added.forEach(
      circle => areaCache.set(circle.id, this.addItem(circle, ITEM_TYPE.CIRCLE))
    );

    diff.circles.updated.forEach(
      circle => this.updateCircle(areaCache, circle)
    );

    diff.circles.removedIds.forEach(
      circleId => this.removeItem(areaCache, circleId)
    );

    this.setState({ areaCache });
  }

  updateMapMarkers(diff) {
    const { markerCache } = this.state;

    diff.markers.added.forEach(
      marker => markerCache.set(marker.id, this.addItem(marker, ITEM_TYPE.MARKER))
    );

    diff.markers.removedIds.forEach(
      markerId => this.removeItem(markerCache, markerId)
    );

    this.setState({ markerCache });
  }

  addItem(item, type) {
    const {map} = this.state;
    const {googleMaps} = this.props;
    const {onLoaded, ...itemProps} = item;

    const added = new googleMaps[type]({
      map: map,
      ...itemProps,
    });

    if (onLoaded) {
      onLoaded(googleMaps, map, added)
    }

    return added;
  }

  removeItem(cache, itemId) {
    const item = cache.get(itemId);
    item.setMap(null);
    cache.delete(itemId)
  }

  updateCircle(areaCache, circleUpdate) {
    const circle = areaCache.get(circleUpdate.id);
    circle.setRadius(circleUpdate.radius);
    circle.setCenter(circleUpdate.center);
  }

  destructureParamCircle(circle) {
    const { center, radius, ...circleProps } = circle;
    return {
      id: this.getCircleId(center),
      type: ITEM_TYPE.CIRCLE,
      center,
      radius,
      ...circleProps
    }
  }

  destructureParamMarker(marker) {
    const { position, ...markerProps } = marker;
    return {
      id: this.getMarkerId(position),
      type: ITEM_TYPE.MARKER,
      position,
      ...markerProps
    }
  }

  getMarkerId(position) {
    return position.lat + "_" + position.lng
  }

  getCircleId(center) {
    return center.lat + "_" + center.lng
  }

  render() {
    return <div ref={ref => (this.ref_map = ref)} style={inlineStyles} />
  }
}

// todo: fix proptypes
GoogleMap.propTypes = {
  autoFitBounds: PropTypes.bool,
  boundsOffset: PropTypes.number,
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      onLoaded: PropTypes.func,
    })
  ),
  googleMaps: PropTypes.object.isRequired,
  onLoaded: PropTypes.func,
};

GoogleMap.defaultProps = {
  autoFitBounds: false,
  boundsOffset: 0.002,
  coordinates: [],
  onLoaded: null,
};

export default GoogleMap