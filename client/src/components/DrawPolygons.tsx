import { Polygon } from "geojson";
import { useCallback, FC } from "react";
import DrawControl from "./DrawControl";

type Props = {
  polygons: GeoJSON.Feature<Polygon>[];
};

const DrawPolygons: FC<Props> = ({ polygons }) => {
  const onUpdate = useCallback((e) => {
    console.log("ON UPDATE", e);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     newFeatures[f.id] = f;
    //   }
    //   return newFeatures;
    // });
  }, []);

  const onCreate = useCallback((e) => {
    console.log("ON CREATE", e);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     newFeatures[f.id] = f;
    //   }
    //   return newFeatures;
    // });
  }, []);

  const onDelete = useCallback((e) => {
    console.log("ON DELETE", e);
    // setFeatures((currFeatures) => {
    //   const newFeatures = { ...currFeatures };
    //   for (const f of e.features) {
    //     delete newFeatures[f.id];
    //   }
    //   return newFeatures;
    // });
  }, []);

  const onLoadDraw = useCallback(
    (drawInstance: MapboxDraw | null) => {
      if (!drawInstance || !polygons.length) return;

      polygons.forEach((polygon) => {
        drawInstance.add(polygon);
        const polygonId = polygon.id;
        drawInstance.changeMode("simple_select", { featureId: polygonId });
      });
    },
    [polygons]
  );

  return (
    <DrawControl
      position="top-left"
      displayControlsDefault={false}
      controls={{
        polygon: true,
        trash: true,
      }}
      defaultMode="draw_polygon"
      onCreate={onCreate}
      onLoad={onLoadDraw}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
};

export default DrawPolygons;
