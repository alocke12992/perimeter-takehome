import mockDb from "../../db/mockDb";
import { ObjectId } from "mongodb";
import { mockFeatures } from "../../db/mocks";
import Session from "../../models/Session";
import FeaturesController from ".";

describe("FeaturesController", () => {
  beforeAll(async () => {
    await mockDb.connect();
  });
  afterAll(async () => {
    await mockDb.dropDB();
  });

  afterEach(async () => {
    await mockDb.dropCollections();
  });

  describe("create", () => {
    it("Creates a new feature", async () => {
      const newSession = new Session({
        // properties of the session
        lat: 1,
        long: 1,
        features: [],
      });
      await newSession.save();

      const feature = {
        session: newSession._id,
        ...mockFeatures[0],
      };
      const created = await FeaturesController.create(feature);
      expect(created).toBeDefined();
      expect(created.session).toEqual(newSession._id);
    });
    it("should add a new feature to the session", async () => {
      const newSession = new Session({
        // properties of the session
        lat: 1,
        long: 1,
      });
      await newSession.save();
      const feature = {
        session: newSession._id,
        ...mockFeatures[0],
      };
      const newFeature = await FeaturesController.create(feature);

      const session = await Session.findById(newSession._id);
      expect(newFeature.session).toEqual(feature.session);
      expect(session).not.toBeNull();
      expect(session?.features).toEqual([newFeature?._id]);
    });

    it("should throw an error if the session is not found", async () => {
      const feature = {
        session: new ObjectId(),
        ...mockFeatures[0],
      };

      try {
        async () => await FeaturesController.create(feature);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(new Error("Session not found"));
      }
    });

    it("should fail if invalid polygon", async () => {
      // invalid polygon
      const feature = {
        session: new ObjectId(),
        ...mockFeatures[1],
        geometry: {
          ...mockFeatures[1].geometry,
          coordinates: [
            [
              [0, 0],
              [1, 1],
            ],
          ],
        },
      };

      try {
        async () => await FeaturesController.create(feature);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toEqual(new Error("Invalid polygon"));
      }
    });
  });
});
