import { useQuery } from "react-query";
import SessionsApi from "../api/SessionsApi";

export const useGetSessionPolygons = (id: string) => {
  const { data, error, isLoading } = useQuery(
    ["getSessionPolygons", id],
    () => {
      if (!id) {
        return;
      }

      return SessionsApi.listSessionPosts(id);
    },
  );
  return {
    data,
    error,
    isLoading,
  };
};
