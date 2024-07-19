import { useGetSessionPolygons } from "../hooks/useGetSessionPolygons";
import useSession from "../hooks/useSession";

const SessionPage = () => {
  const { session } = useSession();
  const { isLoading, data } = useGetSessionPolygons(session?._id || "");
  console.log(data);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <h1>Session Page</h1>
    </div>
  );
};

export default SessionPage;
