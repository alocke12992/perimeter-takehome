import { useGetSession } from "../hooks/useGetSession";
import MapBox from "../components/MapBox";
import DrawFeatures from "../components/DrawFeatures";
import { Box, Flex } from "@chakra-ui/react";
import { Geometry, Polygon } from "geojson";
import { useCallback, useContext, useRef, useState } from "react";
import { useCreateFeature } from "../hooks/useCreateFeature";
import { useDeleteFeature } from "../hooks/useDeleteFeature";
import { SessionContext } from "../context/SessionContext";
import FeatureForm from "../components/FeatureForm";

const SessionPage = () => {
  const drawRef = useRef<MapboxDraw | null>(null); // Ref need
  const selectedElm = useRef<string | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<
    GeoJSON.Feature | undefined
  >();

  const { sessionId } = useContext(SessionContext);
  const { isLoading, data } = useGetSession(sessionId);
  const { createFeature } = useCreateFeature();
  const { deleteFeature } = useDeleteFeature();

  const getFeature = useCallback(
    (feature: GeoJSON.Feature<Geometry> | undefined) => {
      if (!feature?.properties?.featureId) return;
      return data?.features.find(
        (f) => f._id === feature.properties?.featureId
      );
    },
    [data?.features]
  );

  const handleSetSelectedFeature = useCallback(
    (feature: GeoJSON.Feature<Geometry> | undefined) => {
      if (!feature) {
        setSelectedFeature(undefined);
        setHasChanged(false);
        return;
      }

      setSelectedFeature(feature);
    },
    [setSelectedFeature]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFeature) {
      return;
    }

    setSelectedFeature({
      ...selectedFeature,
      properties: {
        name: e.target.value,
      },
    });

    setHasChanged(true);
  };

  const resetElm = useCallback(() => {
    // Feature has been saved, reset the form
    const selected = selectedElm?.current;
    if (!selected) {
      return;
    }
    const feature = drawRef.current?.get(selected);
    const existingFeature = data?.features.find(
      (_feature) => _feature._id === feature?.properties?.featureId
    );
    drawRef.current?.delete(selected);
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
  }, [data?.features]);

  const handleClick = useCallback(
    (e) => {
      if (!drawRef.current) return;
      const selected = drawRef.current.getSelectedIds();

      if (!selected?.length) {
        resetElm();
        setSelectedFeature(undefined);
        return;
      }
      selectedElm.current = selected[0];
      const feature = getFeature(drawRef.current.get(selected?.[0]));
      if (!feature) return;

      setSelectedFeature(feature);
    },
    [getFeature, resetElm]
  );

  const handleSelect = useCallback(
    (id: string) => {
      const feature = data?.features.find((f) => f._id === id);
      setSelectedFeature(feature);
    },
    [data?.features]
  );

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

  const handleCreate = useCallback(
    (e: { features: GeoJSON.Feature<Polygon>[] }) => {
      if (!e?.features) return;
      setSelectedFeature(e.features[0]);
    },
    [setSelectedFeature]
  );

  const handleSubmit = async () => {
    console.log("Submitting", selectedFeature);
    if (!selectedFeature) {
      return;
    }
    console.log("Submitting", selectedFeature);
    if (selectedFeature?._id) {
      // TODO Update existing
      return;
    }
    // TODO validate before submission
    await createFeature({
      feature: selectedFeature,
      session: sessionId,
    });
    setCanSubmit(false);
    setHasChanged(false);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteFeature(id);
      setSelectedFeature(undefined);
    },
    [deleteFeature, setSelectedFeature]
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

  if (isLoading || !data) {
    return null;
  }

  return (
    <Flex h="100%" w="100%" flexDir="column">
      <Box flex="1">
        <MapBox lat={data.lat} long={data.long}>
          <DrawFeatures
            features={data.features}
            handleCreate={handleCreate}
            handleClick={handleClick}
            setSelectedFeature={handleSetSelectedFeature}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            drawRef={drawRef}
          />
        </MapBox>
      </Box>
      <Box h="200px" pt={4}>
        {selectedFeature && (
          <FeatureForm
            name={selectedFeature.properties?.name || ""}
            onClear={handleClear}
            onChange={onChange}
            onSubmit={handleSubmit}
            isDisabled={!hasChanged || !canSubmit}
            onUndo={handleUndo}
          />
        )}
      </Box>
    </Flex>
  );
};

export default SessionPage;
