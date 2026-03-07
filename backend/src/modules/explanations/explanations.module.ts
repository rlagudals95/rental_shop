import { Module } from "@nestjs/common";

import { ExplanationsController } from "./explanations.controller";

@Module({
  controllers: [ExplanationsController],
})
export class ExplanationsModule {}
