import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ObjectId } from "mongodb";
import { IPolygon } from "@src/models/Polygon";
import PolygonsController from "@src/controllers/PolygonsController";

const create = async (req: IReq<IPolygon>, res: IRes) => {
  const { sessionId, geometry, properties } = req.body;
  await PolygonsController.create({
    properties,
    sessionId,
    geometry,
    type: "Feature",
  });
  return res.status(HttpStatusCodes.CREATED).end();
};

const list = async (req: IReq, res: IRes) => {
  const polygons = await PolygonsController.list();
  return res.status(HttpStatusCodes.OK).json({ polygons });
};

const update = async (req: IReq<IPolygon>, res: IRes) => {
  const { sessionId, geometry, properties } = req.body;

  await PolygonsController.update(new ObjectId(req.params.id), {
    properties,
    sessionId,
    geometry,
    type: "Feature",
  });
  return res.status(HttpStatusCodes.CREATED).end();
};

const remove = async (req: IReq, res: IRes) => {
  await PolygonsController.remove(new ObjectId(req.params.id));
  return res.status(HttpStatusCodes.NO_CONTENT).end();
};

export default {
  create,
  list,
  update,
  remove,
};
