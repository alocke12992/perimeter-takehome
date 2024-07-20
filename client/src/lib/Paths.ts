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
      ListSessionPolygons: (id: string) =>
        `${EnvVars.ApiUrl}/sessions/${id}/polygons`,
    },
    Features: {
      Create: () => `${EnvVars.ApiUrl}/features`,
    },
  },
  Views: {
    Session: () => `/`,
    SharedSession: () => `/shared-session/:id`,
  },
};

export default Paths;
