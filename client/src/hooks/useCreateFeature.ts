import { useMutation } from "react-query";
import FeaturesApi from "../api/FeaturesApi";

export const useCreateFeature = () => {
  const { data, error, isLoading, mutate } = useMutation(
    ["createPolygon"],
    async ({
      feature,
      sessionId,
    }: {
      feature: GeoJSON.Feature;
      sessionId: string;
    }) => await FeaturesApi.create(feature, sessionId),
    {
      onError: () => {
        // TODO - Global error context??
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    createFeature: mutate,
  };
};
