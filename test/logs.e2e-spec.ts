import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {LogsModule} from "../src/logs/logs.module";
import {ConfigModule} from "@nestjs/config";
import {configTest} from "../src/config/test.env";

describe('Logs', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    load: [configTest],
                    isGlobal: true
                }),
                LogsModule
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET logs`, () => {
        request(app.getHttpServer())
            .get('/logs')
            .expect(200);
    });

    it(`/GET logs response test is array`, async() => {
        const res = await request(app.getHttpServer()).get('/logs');
        expect(Array.isArray(res.body)).toBe(true);
    });

    it(`/GET logs response is non empty array`, async() => {
        const res = await request(app.getHttpServer()).get('/logs');
        expect(res.body.length).toBeGreaterThan(0);
    });

    it(`/GET logs response is in desc order`, async() => {
        const res = await request(app.getHttpServer()).get('/logs');
        const body = res.body;
        let prev = 10e100;
        for (let i = 0; i < body.length; i++) {
            const ent = body[i];
            expect(ent.Count).toBeDefined();
            expect(ent.Count).toBeLessThanOrEqual(prev);
        }

    });

    afterAll(async () => {
        await app.close();
    });
});
