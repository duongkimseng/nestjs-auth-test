import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  createListDto1
} from './test-data'

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  })

  describe('/auth', () => {
    describe('POST /create', () => {
      it('should return 201 if list is created', () => {
        return request(app.getHttpServer())
        .post('/list/create')
        .send(createListDto1)
        .expect(HttpStatus.CREATED)
        // .expect(res => {
        //   username = res.body.username,
        //   password = res.body.password
        // })
      })
    })
  })


  afterAll(async done => {
    await app.close()
  })

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
