import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envValidationSchema } from "./config/env.validation";
import { ExplanationsModule } from "./modules/explanations/explanations.module";
import { HealthController } from "./modules/health/health.controller";
import { LeadsModule } from "./modules/leads/leads.module";
import { RecommendationsModule } from "./modules/recommendations/recommendations.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    RecommendationsModule,
    ExplanationsModule,
    LeadsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
