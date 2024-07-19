import { useParams } from "react-router-dom";
import { useGetSessionPolygons } from "../hooks/useGetSessionPolygons";

const SessionPage = () => {
  const params = useParams();
  const { isLoading } = useGetSessionPolygons(params?.id || "");

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <h1>Shared Session Page</h1>
    </div>
  );
};

export default SessionPage;
