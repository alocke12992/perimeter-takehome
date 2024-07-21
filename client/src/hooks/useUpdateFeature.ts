import { useMutation, useQueryClient } from "react-query";
import FeaturesApi, { IFeature } from "../api/FeaturesApi";
import { ISession } from "../api/SessionsApi";

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: (feature: IFeature) => {
      return FeaturesApi.update({ feature });
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
        ...variables,
        properties: {
          ...variables.properties,
          featureId: variables.properties?.featureId,
        },
      };
      if (previousSession) {
        queryClient.setQueryData(["session", variables.session], {
          ...previousSession,
          features: previousSession.features.map((feature) => {
            if (feature._id === newFeature.properties?.featureId) {
              return newFeature;
            }
            return feature;
          }),
        });
      }
    },
  });

  const updateFeature = async (feature: IFeature) => {
    return await mutateAsync(feature);
  };

  return {
    data,
    error,
    isLoading,
    updateFeature,
  };
};
