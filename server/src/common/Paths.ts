/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Sessions: {
    Base: "/sessions",
    Create: "/",
    Get: "/:id",
  },
  Features: {
    Base: "/features",
    Create: "/",
    List: "/",
    Update: "/:id",
    Delete: "/:id",
  },
} as const;
