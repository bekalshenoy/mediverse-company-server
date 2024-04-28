import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { AdminModule } from "./admin/admin.module";
import { HospitalModule } from "./hospital/hospital.module";
import { PatientModule } from "./patient/patient.module";
import { ModelModule } from "./model/model.module";
import { ResearcherModule } from "./researcher/researcher.module";
import { APP_PIPE } from "@nestjs/core";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { JwtModule } from "@nestjs/jwt";
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../client/dist/browser"),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "2 days" },
    }),
    AdminModule,
    HospitalModule,
    PatientModule,
    ModelModule,
    ResearcherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
