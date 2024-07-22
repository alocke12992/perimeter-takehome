import { Polygon } from "geojson";
import { FC } from "react";
import { Layer, Source } from "react-map-gl";

export type Props = {
  features: GeoJSON.Feature<Polygon>[];
};

const DisplayFeatures: FC<Props> = ({ features }) => {
  console.log(features);
  return (
    <Source
      id="view-layer"
      type="geojson"
      data={{
        type: "FeatureCollection",
        features: features,
      }}
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

export default DisplayFeatures;
