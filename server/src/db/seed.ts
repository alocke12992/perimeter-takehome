import "@src/pre-start"; // Must be the first import
import Session from "@src/models/Session";
import { faker } from "@faker-js/faker";
import connect from "@src/db";
import { mockFeatures, mockSession } from "./mocks";
import { Types } from "mongoose";
import Feature from "@src/models/Feature";

const createFeatures = (sessionId: Types.ObjectId) => {
  return mockFeatures.map((mockFeatures) => ({
    sessionId,
    ...mockFeatures,
  }));
};

const seed = async () => {
  await connect();
  const session = new Session({
    lat: mockSession.lat,
    long: mockSession.long,
  });
  await session.save();
  const features = createFeatures(session._id);
  await Feature.insertMany(features);
};

const dropCollections = async () => {
  await Session.collection.drop();
  await Feature.collection.drop();
};

(async () => {
  console.log("SEEDING");
  await connect();
  await dropCollections();
  await seed();
  console.log("SEEDING COMPLETE");
  process.exit();
})();
