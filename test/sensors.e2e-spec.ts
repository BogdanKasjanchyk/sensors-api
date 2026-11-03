import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

// Потрібна реальна БД: параметри DB_* беруться із середовища або .env.
// Записи, створені тестом, видаляються наприкінці кожного сценарію.
describe.each([
  { route: 'temperature-sensors', value: 23.5, unit: '°C' },
  { route: 'humidity-sensors', value: 55.5, unit: '%' },
])('/$route (e2e)', ({ route, value, unit }) => {
  let app: INestApplication<App>;

  const startApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const instance = moduleFixture.createNestApplication<INestApplication<App>>();
    instance.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await instance.init();
    return instance;
  };

  beforeEach(async () => {
    app = await startApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('зберігає запис у БД так, що він переживає перезапуск застосунку', async () => {
    const created = await request(app.getHttpServer())
      .post(`/${route}`)
      .send({ sensorName: 'e2e-sensor', value, unit })
      .expect(201);

    expect(created.body.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(created.body.timestamp).toBeTruthy();
    expect(created.body.createdAt).toBeTruthy();

    await app.close();
    app = await startApp();

    const list = await request(app.getHttpServer())
      .get(`/${route}`)
      .expect(200);
    const saved = list.body.find(
      (item: { id: string }) => item.id === created.body.id,
    );
    expect(saved.value).toBe(value);

    await request(app.getHttpServer())
      .patch(`/${route}/${created.body.id}`)
      .send({ value: value + 1 })
      .expect(200);
    const updated = await request(app.getHttpServer())
      .get(`/${route}/${created.body.id}`)
      .expect(200);
    expect(updated.body.value).toBe(value + 1);

    await request(app.getHttpServer())
      .delete(`/${route}/${created.body.id}`)
      .expect(200);
    await request(app.getHttpServer())
      .get(`/${route}/${created.body.id}`)
      .expect(404);
  });

  it('повертає 400 замість помилки БД для некоректних даних', async () => {
    await request(app.getHttpServer()).get(`/${route}/not-a-uuid`).expect(400);
    await request(app.getHttpServer())
      .post(`/${route}`)
      .send({ sensorName: 'x'.repeat(201), value, unit })
      .expect(400);
    await request(app.getHttpServer())
      .post(`/${route}`)
      .send({ sensorName: 'e2e-sensor', value, unit, timestamp: 'not-a-date' })
      .expect(400);
  });

  it('повертає не більше 50 останніх записів, новіші спочатку', async () => {
    const res = await request(app.getHttpServer())
      .get(`/${route}`)
      .expect(200);
    expect(res.body.length).toBeLessThanOrEqual(50);
    const times = res.body.map((item: { createdAt: string }) =>
      new Date(item.createdAt).getTime(),
    );
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });
});
