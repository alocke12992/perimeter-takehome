/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Sessions: {
    Base: "/sessions",
    Create: "/",
    Features: {
      List: "/:id/features", // TODO: Maybe just use features by session id list
    },
  },
  Features: {
    Base: "/features",
    Create: "/",
    List: "/",
    Update: "/:id",
    Delete: "/:id",
  }
} as const;
