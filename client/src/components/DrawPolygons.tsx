import { Geometry, Polygon } from "geojson";
import { useCallback, FC, useRef, useState } from "react";
import { MapEvent } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

type Props = {
  polygons: GeoJSON.Feature<Polygon>[];
  setSelectedFeature: (feature?: GeoJSON.Feature<Geometry>) => void;
};

const DrawPolygons: FC<Props> = ({ polygons, setSelectedFeature }) => {
  const drawRef = useRef<MapboxDraw | null>(null); // Ref need
  // const [selectedFeature, setSelectedFeature] =
  //   useState<GeoJSON.Feature<Polygon> | null>(null);

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
      if (!drawInstance || !polygons.length) return;

      polygons.forEach((polygon) => {
        drawInstance.add(polygon);
        // const polygonId = polygon.id;
        // drawInstance.changeMode("simple_select", { featureId: polygonId });
      });
    },
    [polygons]
  );

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

  // return (
  //   <DrawControl
  //     position="top-left"
  //     displayControlsDefault={false}
  //     controls={{
  //       polygon: true,
  //       trash: true,
  //     }}
  //     defaultMode="draw_polygon"
  //     onCreate={onCreate}
  //     onLoad={onLoadDraw}
  //     onUpdate={onUpdate}
  //     onDelete={onDelete}
  //   />
  // );
};

export default DrawPolygons;