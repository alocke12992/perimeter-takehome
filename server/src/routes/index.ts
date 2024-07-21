import { Router } from "express";
import SessionRoutes from "./SessionRoutes";
import FeatureRoutes from "./FeaturesRoutes";
import Paths from "@src/common/Paths";

// **** Routers **** //
const apiRouter = Router();
const sessionRouter = Router();
const featureRouter = Router();

// **** Routes **** //
// TODO validation
sessionRouter.post(Paths.Sessions.Create, SessionRoutes.create);
sessionRouter.get(Paths.Sessions.Get, SessionRoutes.get);

// TODO validate polygon
// TODO validate session
featureRouter.get(Paths.Features.List, FeatureRoutes.list);
featureRouter.put(Paths.Features.Update, FeatureRoutes.update);
featureRouter.post(Paths.Features.Create, FeatureRoutes.create);
featureRouter.delete(Paths.Features.Delete, FeatureRoutes.remove);

// REGISTER ROUTES
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Features.Base, featureRouter);

export default apiRouter;
