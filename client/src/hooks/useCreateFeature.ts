import { useMutation, useQueryClient } from "react-query";
import FeaturesApi from "../api/FeaturesApi";
import { ISession } from "../api/SessionsApi";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: async ({
      feature,
      session,
    }: {
      feature: GeoJSON.Feature;
      session: string;
    }) => {
      return FeaturesApi.create({ feature, session });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["session", variables.session],
      });
      const previousSession = queryClient.getQueryData<ISession>([
        "session",
        variables.session,
      ]);
      const newFeature = {
        ...data,
        properties: { ...data.properties, featureId: data._id },
      };
      if (previousSession) {
        queryClient.setQueryData(["session", variables.session], {
          ...previousSession,
          features: [...previousSession.features, newFeature],
        });
      }
    },
  });

  const createFeature = async ({
    feature,
    session,
  }: {
    feature: GeoJSON.Feature;
    session: string;
  }) => {
    return await mutateAsync({
      feature,
      session,
    });
  };

  return {
    data,
    error,
    isLoading,
    createFeature,
  };
};
