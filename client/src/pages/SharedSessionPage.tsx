import { useParams } from "react-router-dom";
import { useGetSession } from "../hooks/useGetSession";
import MapBox from "../components/MapBox";
import DisplayFeatures from "../components/DisplayFeatures";
import { Box } from "@chakra-ui/react";

const SessionPage = () => {
  const params = useParams();

  const { isLoading, data } = useGetSession(params?.id || "");

  if (isLoading || !data) {
    return null;
  }

  return (
    <Box h="full" w="full">
      <MapBox lat={data.lat} long={data.long}>
        <DisplayFeatures features={data.features} />
      </MapBox>
    </Box>
  );
};

export default SessionPage;
