import { Router } from "express";
import SessionRoutes from "./SessionRoutes";
import FeatureRoutes from "./FeaturesRoutes";
import Paths from "../common/Paths";
import { isValidPolygon } from "../util/validators";

// **** Routers **** //
const apiRouter = Router();
const sessionRouter = Router();
const featureRouter = Router();

// **** Routes **** //
sessionRouter.post(Paths.Sessions.Create, SessionRoutes.create);
sessionRouter.get(Paths.Sessions.Get, SessionRoutes.get);

featureRouter.get(Paths.Features.List, FeatureRoutes.list);
featureRouter.put(Paths.Features.Update, isValidPolygon, FeatureRoutes.update);
featureRouter.post(Paths.Features.Create, isValidPolygon, FeatureRoutes.create);
featureRouter.delete(Paths.Features.Delete, FeatureRoutes.remove);

// REGISTER ROUTES
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Features.Base, featureRouter);

export default apiRouter;
