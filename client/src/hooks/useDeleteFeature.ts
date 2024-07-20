// A react query mutation that deletes a feature using a feature id.

import { useMutation } from "react-query";

import FeaturesApi from "../api/FeaturesApi";

export const useDeleteFeature = () => {
  const { data, error, isLoading, mutate } = useMutation(
    ["deleteFeature"],
    async (id: string) => await FeaturesApi.remove(id)
  );

  return {
    data,
    error,
    isLoading,
    deleteFeature: mutate,
  };
};
