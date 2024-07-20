import { useGetSessionPolygons } from "../hooks/useGetSessionPolygons";
import useSession from "../hooks/useSession";
import MapBox from "../components/MapBox";
import DrawPolygons from "../components/DrawPolygons";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { Geometry } from "geojson";
import { useState } from "react";
import { useCreatePolygon } from "../hooks/useCreatePolygon";

const SessionPage = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<
    GeoJSON.Feature | undefined
  >();

  const [canSubmit, setCanSubmit] = useState(false);
  const { session } = useSession();
  const { isLoading, data } = useGetSessionPolygons(session?._id || "");
  const { createPolygon } = useCreatePolygon();

  const handleSetSelectedFeature = (
    feature: GeoJSON.Feature<Geometry> | undefined
  ) => {
    if (!feature) {
      setSelectedFeature(undefined);
      setHasChanged(false);
      return;
    }

    setSelectedFeature({
      ...feature,
      properties: {
        name: "",
      },
    });
  };

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
    // TODO validate before submission
    await createPolygon(selectedFeature);
    setCanSubmit(false);
    setHasChanged(false);
  };

  if (isLoading || !data) {
    return null;
  }

  return (
    <Flex h="100%" w="100%" flexDir="column">
      <Box flex="1">
        <MapBox lat={data.session.lat} long={data.session.long}>
          <DrawPolygons
            polygons={data.polygons}
            setSelectedFeature={handleSetSelectedFeature}
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
                  onChange={(e) =>
                    setSelectedFeature({
                      ...selectedFeature,
                      properties: {
                        name: e.target.value,
                      },
                    })
                  }
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
