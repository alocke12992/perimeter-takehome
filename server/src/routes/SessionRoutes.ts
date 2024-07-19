import { ObjectId } from "mongodb";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ISession } from "@src/models/Session";
import SessionsController from "@src/controllers/SessionsController";
import PolygonsController from "@src/controllers/PolygonsController";

const create = async (req: IReq<Omit<ISession, "createdAt">>, res: IRes) => {
  const { lat, long } = req.body;
  const session = await SessionsController.create({ lat, long });
  return res.status(HttpStatusCodes.CREATED).json({ session });
};

const listSessionPolygons = async (req: IReq, res: IRes) => {
  const { id } = req.params;
  console.log("SESSION ID", id);
  const polygons = await PolygonsController.listBySessionId(new ObjectId(id));
  return res.status(HttpStatusCodes.OK).json({ polygons });
};

export default {
  create,
  listSessionPolygons,
};
