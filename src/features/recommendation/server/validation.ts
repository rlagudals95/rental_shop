import type { UserProfile } from "@/features/recommendation/model/types";

const requiredFields: Array<keyof UserProfile> = [
  "sessionId",
  "householdSize",
  "residenceType",
  "movingWithin24m",
  "budgetRange",
  "carePreference",
  "biggestConcern",
  "requiredFeatures",
  "wantsIce",
  "spaceConstraint",
];

export const validateProfile = (
  input: unknown,
):
  | { valid: true; value: UserProfile }
  | { valid: false; details: Array<Record<string, unknown>> } => {
  if (!input || typeof input !== "object") {
    return { valid: false, details: [{ field: "body", reason: "required" }] };
  }

  const object = input as Record<string, unknown>;
  const details = requiredFields
    .filter((field) => object[field] === undefined || object[field] === null)
    .map((field) => ({ field, reason: "required" }));

  if (details.length > 0) {
    return { valid: false, details };
  }

  return { valid: true, value: object as unknown as UserProfile };
};
