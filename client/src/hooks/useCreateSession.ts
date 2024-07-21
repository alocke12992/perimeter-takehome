import { useMutation } from "react-query";
import SessionsApi, { CreateSessionBody } from "../api/SessionsApi";

export const useCreateSession = () => {
  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: ({ lat, long }: CreateSessionBody) =>
      SessionsApi.create({
        lat,
        long,
      }),
  });

  const createSession = async ({ lat, long }: CreateSessionBody) => {
    return await mutateAsync({
      lat,
      long,
    });
  };

  return {
    data,
    error,
    isLoading,
    createSession,
  };
};
