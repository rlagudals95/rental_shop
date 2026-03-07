import { IsArray, IsBoolean, IsIn, IsInt, IsString, Max, Min } from "class-validator";

export class RecommendSessionDto {
  @IsString()
  sessionId!: string;

  @IsInt()
  @Min(1)
  @Max(6)
  householdSize!: number;

  @IsIn(["jeonse_or_monthly", "owned"])
  residenceType!: "jeonse_or_monthly" | "owned";

  @IsBoolean()
  movingWithin24m!: boolean;

  @IsIn(["under_29999", "30000_39999", "40000_plus"])
  budgetRange!: "under_29999" | "30000_39999" | "40000_plus";

  @IsArray()
  @IsString({ each: true })
  requiredFeatures!: string[];

  @IsBoolean()
  wantsIce!: boolean;

  @IsIn(["visit", "self"])
  carePreference!: "visit" | "self";

  @IsIn(["low", "medium", "high"])
  spaceConstraint!: "low" | "medium" | "high";

  @IsIn(["price", "maintenance", "termination_fee"])
  biggestConcern!: "price" | "maintenance" | "termination_fee";
}
