import { useParams } from "react-router-dom";
import { useGetSessionPolygons } from "../hooks/useGetSessionPolygons";
import MapBox from "../components/MapBox";
import DrawPolygons from "../components/DrawPolygons";
import DisplayPolygons from "../components/DisplayPolygons";

const SessionPage = () => {
  const params = useParams();

  const { isLoading, data } = useGetSessionPolygons(params?.id || "");

  if (isLoading || !data) {
    return null;
  }

  return (
    <div>
      <MapBox lat={data.session.lat} long={data.session.long}>
        <DisplayPolygons polygons={data.polygons} />
        <DrawPolygons polygons={data.polygons} />
      </MapBox>
    </div>
  );
};

export default SessionPage;
