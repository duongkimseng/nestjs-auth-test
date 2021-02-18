import { UserDto } from '../src/modules/auth/dto/user.dto';
import { CreateListDto } from '../src/modules/list/dto/create-list.dto';

export const createListDto1: CreateListDto = {
  name: 'test1',
  age: 15,
};

export const userDto1: UserDto = {
  username: 'test1',
  password: '123456',
};

export const userDto2: UserDto = {
  username: 'test2',
  password: '123456',
};
