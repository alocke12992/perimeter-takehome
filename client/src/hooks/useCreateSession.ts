import { useMutation } from "react-query";
import SessionsApi, { CreateSessionBody } from "../api/SessionsApi";

export const useCreateSession = () => {
  const { data, error, isLoading, mutateAsync } = useMutation(
    ["createSession"],
    async ({ lat, long }: CreateSessionBody) =>
      await SessionsApi.create({
        lat,
        long,
      }),
    {
      onError: () => {
        // TODO - Global error context??
      },
    }
  );

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
