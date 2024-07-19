import { Router } from "express";
import { createSession } from "./SessionRoutes";
import Paths from "@src/common/Paths";

// **** Routes **** //

const apiRouter = Router();
const sessionRouter = Router();

// TODO validation
sessionRouter.post(Paths.Sessions.Add, createSession);

// REGISTER ROUTES
apiRouter.use(Paths.Sessions.Base, sessionRouter);

export default apiRouter;
