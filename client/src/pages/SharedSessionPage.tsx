import { useParams } from "react-router-dom";
import { useGetSession } from "../hooks/useGetSession";
import MapBox from "../components/MapBox";
import DisplayFeatures from "../components/DisplayFeatures";

const SessionPage = () => {
  const params = useParams();

  const { isLoading, data } = useGetSession(params?.id || "");

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <MapBox lat={data.lat} long={data.long}>
        <DisplayFeatures features={data.features} />
      </MapBox>
    </div>
  );
};

export default SessionPage;
