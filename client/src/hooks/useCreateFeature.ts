import { useMutation } from "react-query";
import FeaturesApi from "../api/FeaturesApi";

export const useCreateFeature = () => {
  const { data, error, isLoading, mutate } = useMutation({
    mutationFn: async ({
      feature,
      session,
    }: {
      feature: GeoJSON.Feature;
      session: string;
    }) => {
      return FeaturesApi.create({ feature, session });
    },
  });

  return {
    data,
    error,
    isLoading,
    createFeature: mutate,
  };
};
