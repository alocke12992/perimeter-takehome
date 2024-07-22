/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { MapEvent } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import { Polygon } from "geojson";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

type Props = {
  onDelete: (e: { features: GeoJSON.Feature<Polygon>[] }) => void;
  onCreate: (e: { features: GeoJSON.Feature<Polygon>[] }) => void;
  onUpdate: (e: { features: GeoJSON.Feature<Polygon>[] }) => void;
  onClick: (e: MapEvent) => void;
  drawRef: React.MutableRefObject<MapboxDraw | null>;
  onLoad: () => void;
};

const DrawFeatures: FC<Props> = ({
  onDelete,
  onClick,
  onCreate,
  onUpdate,
  onLoad,
  drawRef,
}) => {
  // @ts-ignore
  useControl<MapboxDraw>(
    () => {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
        defaultMode: "simple_select",
      });
      drawRef.current = draw;
      return draw;
    },
    ({ map }) => {
      map.on("load", onLoad);
      map.on("click", onClick);
      map.on("draw.create", onCreate);
      map.on("draw.selectionChange", (e) => {
        console.log("selectionChange", e);
      });
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("load", onLoad);
      map.off("click", onClick);
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position: "top-left",
    }
  );

  return null;
};

export default DrawFeatures;
