import { IsISO8601, IsObject, IsString, Matches } from "class-validator";

export class CreateLeadDto {
  @IsString()
  leadId!: string;

  @IsString()
  sessionId!: string;

  @IsISO8601()
  submittedAt!: string;

  @IsObject()
  customer!: {
    name: string;
    phone: string;
    preferredChannel: string;
    preferredTime?: string;
  };

  @IsObject()
  profile!: Record<string, unknown>;

  @IsObject()
  recommendation!: {
    top3: string[];
    selectedProductId: string;
    summary: string;
    riskNotes: string[];
  };
}

export class LeadPhoneDto {
  @Matches(/^\d{10,11}$/)
  phone!: string;
}
