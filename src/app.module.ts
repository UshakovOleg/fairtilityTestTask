import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {config} from "./config/development.env";
import {LogsModule} from "./logs/logs.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config], // TODO: ENV DEPENDING CONFIG
      isGlobal: true
    }),
    LogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
