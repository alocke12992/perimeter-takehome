import EnvVars from "./EnvVars";

// type Params = {
//   id?: string;
// };

// type Path = {
//   path: string;
//   resolve: (params: Params) => string;
// };
const Paths = {
  Api: {
    Sessions: {
      Create: () => `${EnvVars.ApiUrl}/sessions`,
      ListSessionFeatures: (id: string) =>
        `${EnvVars.ApiUrl}/sessions/${id}/features`,
    },
    Features: {
      Create: () => `${EnvVars.ApiUrl}/features`,
      Remove: (id: string) => `${EnvVars.ApiUrl}/features/${id}`,
    },
  },
  Views: {
    Session: () => `/`,
    SharedSession: () => `/shared-session/:id`,
  },
};

export default Paths;
