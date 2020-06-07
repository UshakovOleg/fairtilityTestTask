import { Module } from '@nestjs/common';
import {LogsController} from "./logs.controller";
import {LogsService} from "./logs.service";
import {ConfigModule} from "@nestjs/config";
import * as sort from 'fast-sort';
@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [LogsController],
    providers: [
        LogsService,
        {
            provide: 'sort',
            useValue: sort
        }

    ],
})
export class LogsModule {

}
