/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, FC, useRef } from "react";
import { MapEvent } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";
import { Geometry } from "geojson";
import { IFeature } from "../api/FeaturesApi";

type Props = {
  features: IFeature[];
  setSelectedFeature: (feature?: GeoJSON.Feature<Geometry>) => void;
  handleDelete: (id: string) => void;
};

const DrawFeatures: FC<Props> = ({
  features,
  setSelectedFeature,
  handleDelete,
}) => {
  const drawRef = useRef<MapboxDraw | null>(null); // Ref need
  // const [selectedFeature, setSelectedFeature] =
  //   useState<GeoJSON.Feature<Feature> | null>(null);

  const onUpdate = useCallback((e: MapEvent) => {
    console.log("ON UPDATE", e);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     newFeatures[f.id] = f;
    //   }
    //   return newFeatures;
    // });
  }, []);

  const onClick = useCallback(() => {
    if (!drawRef.current) return;
    const selected = drawRef.current.getSelectedIds();
    const feature = drawRef.current.get(selected?.[0]);
    console.log("ON CLICK", feature);
    setSelectedFeature(feature);
  }, [setSelectedFeature]);

  const onCreate = useCallback(
    (e: { features: IFeature[] }) => {
      if (!e?.features) return;
      setSelectedFeature(e.features[0]);
    },
    [setSelectedFeature]
  );

  const onDelete = useCallback(
    (e: { features: IFeature[] }) => {
      // NOTE: this is dumb but it works
      // For some reason the _id is being dropped (likely due to strict types) so we need to find the feature by the id
      // Def not safe but it'll be a "next sprint" problem
      if (!e?.features?.[0]?.properties?._id) return;
      const feature = features.find(
        (feat) => feat?.properties?._id === e.features[0].properties?._id
      );
      handleDelete(feature?._id || "");
    },
    [handleDelete, features]
  );

  const onModeChange = useCallback((e: { mode: string }) => {
    console.log("ON MODE CHANGE", e);
  }, []);

  const onLoadDraw = useCallback(() => {
    if (!features?.length) return;

    features.forEach((feature) => {
      if (!drawRef?.current) return;
      console.log("ADDING FEATURE", feature);
      drawRef?.current.add(feature);
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

      map.on("click", onClick);
      map.on("draw.create", onCreate);
      map.on("draw.selectionChange", (e) => {
        console.log("selectionChange", e);
      });
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
      map.on("draw.modechange", onModeChange);
    },
    ({ map }) => {
      map.off("load", onLoadDraw);
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
