import { useMutation } from "react-query";
import FeaturesApi from "../api/FeaturesApi";

export const useCreateFeature = () => {
  const { data, error, isLoading, mutate } = useMutation(
    ["createPolygon"],
    async (feature: GeoJSON.Feature) => await FeaturesApi.create(feature),
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
