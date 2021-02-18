import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListEntity } from './entities/list.entity';
import { ListService } from './list.service';

const listArray = [
  new ListEntity('list1', 12),
  new ListEntity('list2', 15),
  new ListEntity('list3', 20),
];

const oneList = new ListEntity('list1', 12);

describe('ListService', () => {
  let listService: ListService;
  let repo: Repository<ListEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: getRepositoryToken(ListEntity),

          useValue: {
            find: jest.fn().mockResolvedValue(listArray),
            create: jest.fn().mockReturnValue(oneList),
          },
        },
      ], // Add
    }).compile();

    listService = module.get<ListService>(ListService);
    repo = module.get<Repository<ListEntity>>(getRepositoryToken(ListEntity));
  });

  it('should be defined', () => {
    expect(listService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of lists', async () => {
      const lists = await listService.findAll();
      expect(lists).toEqual(listArray);
    });
  });
});
