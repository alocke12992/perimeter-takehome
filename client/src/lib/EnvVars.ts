/**
 * Environments variables declared here.
 */

const EnvVars = {
  ApiUrl: import.meta.env.VITE_API_URL ?? "",
  MapBoxToken: import.meta.env.VITE_MAPBOX_TOKEN ?? "",
};

export default EnvVars;