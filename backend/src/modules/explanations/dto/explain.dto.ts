import { IsArray, IsObject } from "class-validator";

export class ExplainDto {
  @IsObject()
  profile!: Record<string, unknown>;

  @IsArray()
  rankedProducts!: Array<Record<string, unknown>>;
}
