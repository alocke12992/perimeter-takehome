import { Router } from "express";
import SessionRoutes from "./SessionRoutes";
import PolygonRoutes from "./PolygonRoutes";
import Paths from "@src/common/Paths";

// **** Routers **** //
const apiRouter = Router();
const sessionRouter = Router();
const polygonRouter = Router();

// **** Routes **** //
// TODO validation
sessionRouter.post(Paths.Sessions.Create, SessionRoutes.create);
sessionRouter.get(
  Paths.Sessions.Polygons.List,
  SessionRoutes.listSessionPolygons
);

// TODO validate polygon
// TODO validate session
polygonRouter.get(Paths.Polygons.List, PolygonRoutes.list);
polygonRouter.put(Paths.Polygons.Update, PolygonRoutes.update);
polygonRouter.post(Paths.Polygons.Create, PolygonRoutes.create);
polygonRouter.delete(Paths.Polygons.Delete, PolygonRoutes.remove);

// REGISTER ROUTES
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Polygons.Base, polygonRouter);

export default apiRouter;
