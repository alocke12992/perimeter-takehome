import { useQuery } from "react-query";
import SessionsApi from "../api/SessionsApi";

export const useGetSessionFeatures = (id: string) => {
  const { data, error, isLoading } = useQuery(
    ["getSessionFeatures", id],
    () => {
      if (!id) {
        return;
      }

      return SessionsApi.listSessionFeatures(id);
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};
