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
      Get: (id: string) => `${EnvVars.ApiUrl}/sessions/${id}`,
    },
    Features: {
      Create: () => `${EnvVars.ApiUrl}/features/`,
      Update: (id: string) => `${EnvVars.ApiUrl}/features/${id}`,
      Remove: (id: string) => `${EnvVars.ApiUrl}/features/${id}`,
    },
  },
  Views: {
    Session: () => `/`,
    SharedSession: () => `/shared-session/:id`,
  },
};

export default Paths;
