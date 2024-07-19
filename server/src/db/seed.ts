import "@src/pre-start"; // Must be the first import
import Session from "@src/models/Session";
import { faker } from "@faker-js/faker";
import connect from "@src/db";
import { mockPolygons } from "./mocks";
import { Types } from "mongoose";
import Polygon from "@src/models/Polygon";

const createPolygons = (sessionId: Types.ObjectId) => {
  return mockPolygons.map((mockPolygon) => ({
    sessionId,
    ...mockPolygon,
  }));
};

const seed = async () => {
  await connect();
  const session = new Session({
    lat: faker.location.latitude(),
    long: faker.location.longitude(),
  });
  await session.save();
  const polygons = createPolygons(session._id);
  await Polygon.insertMany(polygons);
};

const dropCollections = async () => {
  await Session.collection.drop();
  await Polygon.collection.drop();
};

(async () => {
  console.log("SEEDING");
  await connect();
  await dropCollections();
  await seed();
  console.log("SEEDING COMPLETE");
  process.exit();
})();
