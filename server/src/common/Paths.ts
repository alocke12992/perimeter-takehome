/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Sessions: {
    Base: "/sessions",
    Create: "/",
    Polygons: {
      List: "/:id/polygons", // TODO: Maybe just use polygons by session id list
    },
  },
  Polygons: {
    Base: "/polygons",
    Create: "/",
    List: "/",
    Update: "/:id",
    Delete: "/:id",
  }
} as const;
