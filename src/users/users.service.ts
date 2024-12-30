import { HttpException, HttpStatus, Injectable, Header } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, firstName: 'Luka',lastName: 'Gobechia', age: 19, subscription: '2025-01-29T17:26:15.911Z' },
    { id: 2, firstName: 'Gio',lastName: 'Gobechia', age: 19, subscription: '2023-01-29T17:26:15.911Z' },
    { id: 3, firstName: 'Nika',lastName: 'Gobechia', age: 19,subscription: '2025-01-29T17:26:15.911Z' },
    { id: 4, firstName: 'Ilo',lastName: 'Gobechia', age: 19,subscription: '2024-01-29T17:26:15.911Z' },
  ];
  create(createUserDto: CreateUserDto) {
    const lastID = this.users[this.users.length - 1]?.id || 0;
    const subscription = new Date();
    const daysToAdd = 30;
    subscription.setDate(subscription.getDate() + daysToAdd);
    const newUser = {
      id: lastID + 1,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      age: createUserDto.age,
      subscription: subscription.toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((el) => el.id === id);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    user.age = updateUserDto.age || user.age;
    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.subscription = updateUserDto.subscription.toISOString() || user.subscription;
    return ['Updated user: ', user];
  }

  remove(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user id not found', HttpStatus.BAD_REQUEST);
    this.users.splice(index, 1);
    return 'Deleted';
  }
}
