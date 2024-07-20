import { useGetSessionPolygons } from "../hooks/useGetSessionPolygons";
import useSession from "../hooks/useSession";
import MapBox from "../components/MapBox";
import DrawPolygons from "../components/DrawPolygons";

const SessionPage = () => {
  const { session } = useSession();
  const { isLoading, data } = useGetSessionPolygons(session?._id || "");

  if (isLoading || !data) {
    return null;
  }

  return (
    <MapBox lat={data.session.lat} long={data.session.long}>
      <DrawPolygons polygons={data.polygons} />
    </MapBox>
  );
};

export default SessionPage;
