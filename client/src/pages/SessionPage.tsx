import { useGetSession } from "../hooks/useGetSession";
import MapBox from "../components/MapBox";
import DrawFeatures from "../components/DrawFeatures";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { Geometry } from "geojson";
import { useCallback, useContext, useState } from "react";
import { useCreateFeature } from "../hooks/useCreateFeature";
import { useDeleteFeature } from "../hooks/useDeleteFeature";
import { SessionContext } from "../context/SessionContext";

const SessionPage = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<
    GeoJSON.Feature | undefined
  >();

  const { sessionId } = useContext(SessionContext);
  const { isLoading, data } = useGetSession(sessionId);
  const { createFeature } = useCreateFeature();
  const { deleteFeature } = useDeleteFeature();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async () => {
    if (!selectedFeature) {
      return;
    }
    console.log("Submitting", selectedFeature);
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
      setHasChanged(false);
    },
    [deleteFeature, setSelectedFeature]
  );

  if (isLoading || !data) {
    return null;
  }

  return (
    <Flex h="100%" w="100%" flexDir="column">
      <Box flex="1">
        <MapBox lat={data.lat} long={data.long}>
          <DrawFeatures
            features={data.features}
            setSelectedFeature={handleSetSelectedFeature}
            handleDelete={handleDelete}
          />
        </MapBox>
      </Box>
      <Box h="200px" pt={4}>
        {selectedFeature && (
          <>
            <Flex w="full" justify="center" gap={8}>
              <Button onClick={() => console.log("Save")}>Undo</Button>
              <Button onClick={() => console.log("Cancel")}>Clear</Button>
              <Button
                disabled={!hasChanged || !canSubmit}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Flex>
            <Flex w="full">
              <Box>
                <Text mb="8px">Enter Name</Text>
                <Input
                  value={selectedFeature?.properties?.name}
                  onChange={handleInputChange}
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SessionPage;
