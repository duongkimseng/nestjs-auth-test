import { Test, TestingModule } from '@nestjs/testing';
import { CreateListDto } from './dto/create-list.dto';
import { ListController } from './list.controller';
import { ListService } from './list.service';

const listname = 'name1';
const listage: number = 12;

describe('List Controller', () => {
  let controller: ListController;
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],

      providers: [
        {
          provide: ListService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { name: listname, age: listage },
              { name: 'name2', age: 14 },
              { name: 'name3', age: 18 },
            ]),

            create: jest
              .fn()
              .mockImplementation((createList: CreateListDto) =>
                Promise.resolve({ createList }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<ListController>(ListController);
    service = module.get<ListService>(ListService);
  });

  it('should be defind', () => {
    expect(controller).toBeDefined();
  });

  describe('get lists', () => {
    it('should get an array of lists', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          name: listname,
          age: listage,
        },
        {
          name: 'name2',
          age: 14,
        },
        {
          name: 'name3',
          age: 18,
        },
      ]);
    });
  });

  describe('create', () => {
    it('should create a new list', async () => {
      const createList: CreateListDto = {
        name: 'new name',
        age: 22,
      };
      await expect(controller.create(createList)).resolves.toEqual({
        createList,
      });
    });
  });
});
