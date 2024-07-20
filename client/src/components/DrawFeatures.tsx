/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Geometry } from "geojson";
import { useCallback, FC, useRef } from "react";
import { MapEvent } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

type Props = {
  features: GeoJSON.Feature[];
  setSelectedFeature: (feature?: GeoJSON.Feature<Geometry>) => void;
};

const DrawFeatures: FC<Props> = ({ features, setSelectedFeature }) => {
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
    setSelectedFeature(feature);
  }, []);

  const onCreate = useCallback((e: { features: object[] }) => {
    if (!e?.features) return;
    // TODO: fix this
    // @ts-ignore
    setSelectedFeature(e.features[0]);
  }, []);

  const onDelete = useCallback((e: MapEvent) => {
    console.log("ON DELETE", e);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     delete newFeatures[f.id];
    //   }
    //   return newFeatures;
    // });
  }, []);

  const onModeChange = useCallback((e: { mode: string }) => {
    console.log("ON MODE CHANGE", e);
  }, []);

  const onLoadDraw = useCallback(
    (drawInstance: MapboxDraw | null) => {
      if (!drawInstance || !features?.length) return;

      features.forEach((features) => {
        drawInstance.add(features);
      });
    },
    [features]
  );

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
        defaultMode: "draw_polygon",
      });
      drawRef.current = draw;
      return draw;
    },
    ({ map }) => {
      if (drawRef?.current) {
        map.on("load", () => onLoadDraw(drawRef?.current));
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
