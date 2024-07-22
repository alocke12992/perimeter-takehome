import "../pre-start"; // Must be the first import
import Session from "../models/Session";
import { faker } from "@faker-js/faker";
import connect from "../db";
import { mockFeatures, mockSession } from "./mocks";
import { Types } from "mongoose";
import Feature from "../models/Feature";

const createFeatures = async (session: Types.ObjectId) => {
  const features = mockFeatures.map(
    (mockFeature) =>
      new Feature({
        ...mockFeature,
        properties: {
          name: faker.location.city(),
        },
        session,
      })
  );
  return await Feature.insertMany(features);
};

const seed = async () => {
  await connect();

  const session = new Session({
    lat: mockSession.lat,
    long: mockSession.long,
  });

  await session.save();
  const features = await createFeatures(session._id);
  session.features.push(...features.map((feature) => feature._id));
  await session.save();
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
