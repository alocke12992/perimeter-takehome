import MapBox from "../../components/MapBox";
import DrawFeatures from "./components/DrawFeatures";
import FeatureForm from "./components/EditFeaturesForm";
import { Box, Flex } from "@chakra-ui/react";
import { Polygon } from "geojson";
import { useCallback, FC, useRef, useState } from "react";
import { ISession } from "../../api/SessionsApi";
import { IFeature } from "../../api/FeaturesApi";

import { booleanValid } from "@turf/boolean-valid";

type Props = {
  session: ISession;
  createFeature: ({
    feature,
    session,
  }: {
    feature: GeoJSON.Feature;
    session: string;
  }) => Promise<IFeature>;
  deleteFeature: (id: string) => void;
  updateFeature: (feature: IFeature) => Promise<IFeature>;
};

const DrawForm: FC<Props> = ({
  session,
  createFeature,
  deleteFeature,
  updateFeature,
}) => {
  const drawRef = useRef<MapboxDraw | null>(null); // Ref need
  const selectedElm = useRef<GeoJSON.Feature<Polygon> | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<
    GeoJSON.Feature | undefined
  >(undefined);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFeature) return;

    setSelectedFeature({
      ...selectedFeature,
      properties: {
        ...selectedFeature.properties,
        name: e.target.value,
      },
    });
  };

  // TODO fix click away reset
  const resetElm = useCallback(() => {
    // Feature has been saved, reset the form
    const selected = selectedElm?.current;
    if (!selected?.id) {
      return;
    }
    const selectedId = selected.id.toString();
    const feature = drawRef.current?.get(selectedId);

    const existingFeature = session.features.find(
      (_feature) => _feature._id === feature?.properties?.featureId
    );

    drawRef.current?.delete(selectedId);
    // If we find an existing feature, reset map with that feature
    if (existingFeature) {
      drawRef.current?.add({
        ...existingFeature,
        properties: {
          ...existingFeature.properties,
          featureId: existingFeature._id,
        },
      });
    }
    selectedElm.current = null;
    setSelectedFeature(undefined);
  }, [session]);

  const onClick = useCallback(() => {
    if (!drawRef.current) return;
    const selected = drawRef.current.getSelectedIds();
    if (!selected?.length && selectedElm.current?.id) {
      resetElm();
      return;
    }

    const feature = drawRef.current.get(selected[0]);
    if (!feature) return;
    selectedElm.current = feature as GeoJSON.Feature<Polygon>;
    setSelectedFeature(feature);
  }, [resetElm]);

  const handleUndo = () => {
    const selected = drawRef.current?.getSelectedIds();
    if (!selected?.length) {
      return;
    }
    const feature = drawRef.current?.get(selected[0]);
    // Feature hasn't been saved yet, just delete it
    if (!feature?.properties?.featureId) {
      return drawRef.current?.delete(selected);
    }
    resetElm();
  };

  const onCreate = useCallback(
    (e: { features: GeoJSON.Feature<Polygon>[] }) => {
      if (!e?.features?.[0]?.id) return;
      selectedElm.current = e.features[0];
      setSelectedFeature(e.features[0]);
    },
    []
  );

  const handleUpdateDraw = useCallback(
    (feature: IFeature) => {
      if (!feature || !selectedElm?.current?.id) {
        return;
      }
      const selectedId = selectedElm.current.id.toString();
      drawRef.current?.delete(selectedId);
      drawRef.current?.add({
        ...feature,
        properties: {
          ...feature.properties,
          featureId: feature._id,
        },
      });
    },
    [selectedElm]
  );

  const handleSubmit = async () => {
    if (!selectedElm?.current?.id) {
      return;
    }
    const drawFeature = drawRef.current?.get(selectedElm.current.id.toString());

    if (!drawFeature) {
      return;
    }
    const isValidPolygon = booleanValid(drawFeature);
    if (!isValidPolygon) {
      return;
    }

    if (selectedFeature?.properties?.featureId) {
      const updated = await updateFeature({
        ...selectedFeature,
        session: session._id,
        _id: selectedFeature.properties.featureId,
        properties: {
          ...selectedFeature?.properties,
        },
      } as IFeature);
      return handleUpdateDraw(updated);
    }

    // TODO validate before submission
    const updated = await createFeature({
      feature: {
        ...drawFeature,
        properties: {
          ...drawFeature?.properties,
          name: selectedFeature?.properties?.name,
        },
      },
      session: session._id,
    });
    handleUpdateDraw(updated);
  };

  const handleUpdate = useCallback(
    (e: { features: GeoJSON.Feature<Polygon>[] }) => {
      selectedElm.current = e.features[0];
      setSelectedFeature(e.features[0]);
    },
    []
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteFeature(id);
      setSelectedFeature(undefined);
      selectedElm.current = null;
    },
    [deleteFeature, setSelectedFeature]
  );

  const onDelete = useCallback(
    (e: { features: GeoJSON.Feature<Polygon>[] }) => {
      if (!e.features[0].properties?.featureId) return;
      handleDelete(e.features[0].properties?.featureId);
    },
    [handleDelete]
  );

  const handleClear = useCallback(() => {
    const selected = drawRef.current?.getSelectedIds();
    if (!selected?.length) {
      return;
    }
    const feature = drawRef.current?.get(selected[0]);

    // delete feature from state if it's been saved
    if (feature?.properties?.featureId) {
      handleDelete(feature.properties.featureId);
    }
    drawRef.current?.delete(selected);
  }, []);

  const onLoadDraw = useCallback(() => {
    if (!session.features?.length) return;
    session.features.forEach((feature) => {
      if (!drawRef?.current) return;
      drawRef?.current.add({
        ...feature,
        properties: {
          ...feature.properties,
          // We lose the _id when we add the feature to the map so we can reference data we're getting from the backend
          featureId: feature._id,
        },
      });
    });
  }, [session.features]);

  return (
    <Flex h="100%" w="100%" flexDir="column">
      <Box flex="1">
        <MapBox lat={session.lat} long={session.long}>
          <DrawFeatures
            onCreate={onCreate}
            onClick={onClick}
            onDelete={onDelete}
            drawRef={drawRef}
            onLoad={onLoadDraw}
            onUpdate={handleUpdate}
          />
        </MapBox>
      </Box>
      <Box h="200px" pt={4}>
        {selectedFeature && (
          <FeatureForm
            name={selectedFeature.properties?.name}
            onClear={handleClear}
            onChange={onChange}
            onSubmit={handleSubmit}
            onUndo={handleUndo}
          />
        )}
      </Box>
    </Flex>
  );
};

export default DrawForm;
