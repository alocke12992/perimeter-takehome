import "@src/pre-start"; // Must be the first import
import Session from "@src/models/Session";
import { faker } from "@faker-js/faker";
import connect from "@src/db";

const seed = async () => {
  await connect();
  const session = new Session({
    lat: faker.location.latitude(),
    long: faker.location.longitude(),
  });
  await session.save();
};

const dropCollections = async () => {
  await Session.collection.drop();
};

(async () => {
  console.log("SEEDING");
  await connect();
  await dropCollections();
  await seed();
  console.log("SEEDING COMPLETE");
  process.exit();
})();
