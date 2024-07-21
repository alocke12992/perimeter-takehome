import "@src/pre-start"; // Must be the first import
import Session from "@src/models/Session";
import { faker } from "@faker-js/faker";
import connect from "@src/db";
import { mockFeatures, mockSession } from "./mocks";
import Feature from "@src/models/Feature";

const createFeatures = async () => {
  const features = mockFeatures.map(
    (mockFeature) =>
      new Feature({
        ...mockFeature,
        properties: {
          name: faker.location.city(),
        },
      })
  );
  return await Feature.insertMany(features);
};

const seed = async () => {
  await connect();
  const features = await createFeatures();

  const session = new Session({
    lat: mockSession.lat,
    long: mockSession.long,
    features: features.map((feature) => feature._id),
  });

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
