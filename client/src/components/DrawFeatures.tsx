/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, FC, useRef } from "react";
import { MapEvent } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import { Geometry, Polygon } from "geojson";
import { IFeature } from "../api/FeaturesApi";

type Props = {
  features: IFeature[];
  setSelectedFeature: (feature?: GeoJSON.Feature<Polygon>) => void;
  handleDelete: (id: string) => void;
  handleSelect: (id: string) => void;
  handleCreate: (e: { features: GeoJSON.Feature<Polygon> }) => void;
  handleClick: (e: MapEvent) => void;
  drawRef: React.MutableRefObject<MapboxDraw | null>;
};

const DrawFeatures: FC<Props> = ({
  features,
  setSelectedFeature,
  handleDelete,
  handleSelect,
  handleClick,
  handleCreate,
  drawRef,
}) => {
  const onUpdate = useCallback((e: MapEvent) => {
    console.log("ON UPDATE", e);
  }, []);

  const onDelete = useCallback(
    (e: { features: IFeature[] }) => {
      if (!e.features[0].properties?.featureId) return;
      handleDelete(e.features[0].properties.featureId);
      return;
    },
    [handleDelete]
  );

  const onModeChange = useCallback((e: { mode: string }) => {
    console.log("ON MODE CHANGE", e);
  }, []);

  const onLoadDraw = useCallback(() => {
    if (!features?.length) return;

    features.forEach((feature) => {
      if (!drawRef?.current) return;
      console.log("ADDING FEATURE", feature);
      drawRef?.current.add({
        ...feature,
        properties: {
          ...feature.properties,
          // We lose the _id when we add the feature to the map so we can reference data we're getting from the backend
          featureId: feature._id,
        },
      });
    });
  }, [features]);

  // TODO: fix this
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
      if (drawRef?.current) {
        map.on("load", onLoadDraw);
      }

      map.on("click", handleClick);
      map.on("draw.create", handleCreate);
      map.on("draw.selectionChange", (e) => {
        console.log("selectionChange", e);
      });
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
      map.on("draw.modechange", onModeChange);
    },
    ({ map }) => {
      map.off("load", onLoadDraw);
      map.off("click", handleClick);
      map.off("draw.create", handleCreate);
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
