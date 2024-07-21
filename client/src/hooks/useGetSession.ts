import { useQuery } from "react-query";
import SessionsApi from "../api/SessionsApi";

export const useGetSession = (id: string) => {
  const { data, error, isLoading } = useQuery(["session", id], () => {
    if (!id) {
      return;
    }

    return SessionsApi.get(id);
  });
  return {
    data,
    error,
    isLoading,
  };
};
