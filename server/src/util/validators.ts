import { body } from "express-validator";
import { booleanValid } from "@turf/boolean-valid";

export const isValidPolygon = body("geometry").custom((value) => {
  return (
    value.type === "Polygon" &&
    value.coordinates.length > 0 &&
    booleanValid(value)
  );
});
