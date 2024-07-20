import { useParams } from "react-router-dom";
import { useGetSessionFeatures } from "../hooks/useGetSessionFeatures";
import MapBox from "../components/MapBox";
import DisplayFeatures from "../components/DisplayFeatures";

const SessionPage = () => {
  const params = useParams();

  const { isLoading, data } = useGetSessionFeatures(params?.id || "");

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <MapBox lat={data.session.lat} long={data.session.long}>
        <DisplayFeatures features={data.features} />
      </MapBox>
    </div>
  );
};

export default SessionPage;
