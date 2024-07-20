import { FC } from "react";
import MapBox from "../components/MapBox";
import DisplayFeatures from "../components/DisplayPolygons";
import { Polygon } from "geojson";

type Props = {
  lat: number;
  long: number;
  polygons: GeoJSON.Feature<Polygon>[];
};

const ViewPolygons: FC<Props> = ({ lat, long, polygons }) => {
  return (
    <MapBox lat={lat} long={long}>
      <DisplayFeatures polygons={polygons} />
    </MapBox>
  );
};

export default ViewPolygons;
