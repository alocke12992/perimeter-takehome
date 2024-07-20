import { FC } from "react";
import { Layer, Source } from "react-map-gl";
import { Polygon } from "geojson";

export type Props = {
  polygons: GeoJSON.Feature<Polygon>[];
};

const DisplayPolygons: FC<Props> = ({ polygons }) => {
  return (
    <Source
      id="view-layer"
      type="geojson"
      data={{ type: "FeatureCollection", features: polygons }}
    >
      <Layer
        type="fill"
        source="view-layer"
        paint={{
          "fill-color": "#00ff00",
          "fill-opacity": 0.5,
        }}
      />
    </Source>
  );
};

export default DisplayPolygons;
