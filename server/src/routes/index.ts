import { Router } from "express";
import SessionRoutes from "./SessionRoutes";
import PolygonRoutes from "./FeaturesRoutes";
import Paths from "@src/common/Paths";

// **** Routers **** //
const apiRouter = Router();
const sessionRouter = Router();
const featureRouter = Router();

// **** Routes **** //
// TODO validation
sessionRouter.post(Paths.Sessions.Create, SessionRoutes.create);
sessionRouter.get(
  Paths.Sessions.Features.List,
  SessionRoutes.listSessionFeatures
);

// TODO validate polygon
// TODO validate session
featureRouter.get(Paths.Features.List, PolygonRoutes.list);
featureRouter.put(Paths.Features.Update, PolygonRoutes.update);
featureRouter.post(Paths.Features.Create, PolygonRoutes.create);
featureRouter.delete(Paths.Features.Delete, PolygonRoutes.remove);

// REGISTER ROUTES
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Features.Base, featureRouter);

export default apiRouter;
