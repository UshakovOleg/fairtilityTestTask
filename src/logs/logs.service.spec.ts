import { Test, TestingModule } from '@nestjs/testing'
import {LogsService} from "./logs.service";
import {ConfigModule} from "@nestjs/config";
import {configTest} from "../config/test.env";
import {ISpacesFieldsParsedItem} from "./classes/parsers/parseStrategies/ISpacesFieldsParsed";

describe('Logs', () => {
  let provider: LogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        load: [configTest],
        isGlobal: true
      }),],
      providers: [LogsService],
    }).compile();

    provider = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it(`should be an array`, async() => {
    const res: ISpacesFieldsParsedItem[] = await provider.printLogData('log_example.log');
    expect(Array.isArray(res)).toBe(true);
  });

  it(`each item should have cs-host property`, async() => {
    const res: ISpacesFieldsParsedItem[] = await provider.printLogData('log_example.log');
    for(let i = 0; i < res.length; i++) {
      expect(res[i]['cs-host']).toBeDefined();
      expect(!!res[i]['cs-host']).toBe(true);
    }
  });

  it(`each item should have cs-host property`, async () => {
    await expect(provider.printLogData('')).rejects.toThrowError(TypeError);
  });
});
