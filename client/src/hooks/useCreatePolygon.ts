import { useMutation } from "react-query";
import PolygonsApi from "../api/PolygonsApi";

export const useCreatePolygon = () => {
  const { data, error, isLoading, mutate } = useMutation(
    ["createPolygon"],
    async (feature: GeoJSON.Feature) => await PolygonsApi.create(feature),
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
    createPolygon: mutate,
  };
};
