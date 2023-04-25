import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

process.env.NODE_ENV = 'test';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await moduleFixture.close();
    await app.close();
  });
  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('GET /statistic', () => {
    it('Should be able to fetch a code', async () => {
      const { status } = await request(app.getHttpServer()).get(
        '/statistic/lnUPXPx13',
      );
      expect(status).toBe(200);
    });
  });
  describe('POST /encode', () => {
    it('Should throw error when user tries to create shortlink with an empty payload', async () => {
      const { status } = await request(app.getHttpServer()).post('/encode/');

      expect(status).toBe(400);
    });

    it('Should throw error when numeric value is provided', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/encode/')
        .send({
          link: 1,
        });
      expect(status).toBe(400);
    });

    it('Should throw error when string and not URL value is provided', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/encode/')
        .send({
          link: 'samuel',
        });
      expect(status).toBe(400);
    });

    it('Should not be able to post to a different endpoint', async () => {
      const res = await request(app.getHttpServer())
        .post('/shortlink/encode/')
        .send({
          link: 'https://google.net',
        });

      const resBody = res?.body;

      expect(resBody.statusCode).toBe(404);
      expect(resBody.message).toBe('Cannot POST /shortlink/encode/');
      expect(resBody.error).toBe('Not Found');
    });

    it('Should create shortlink successful', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/encode')
        .send({
          link: 'https://google.net',
        });

      expect(status).toBe(201);
    });
  });
});
