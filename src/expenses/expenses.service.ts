import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/queryParams.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly usersService: UsersService) {}
  private expenses = [
    {
      id: 1,
      category: 'New Year',
      productName: 'Christmas tree',
      quantity: 15,
      price: 548,
      userId: 1

    },
    {
      id: 2,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 3,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 4,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 5,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 6,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 7,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 8,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 9,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1

    },
    {
      id: 10,
      category: 'New Year',
      productName: 'Chichilaki',
      quantity: 50,
      price: 15,
      userId: 1
    },
  ];
  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
    const user = await this.usersService.findOne(Number(userId));
    if (!user) throw new BadRequestException('User not found');
    const newExpense = {
      id: lastId + 1,
      category: createExpenseDto.category,
      productName: createExpenseDto.productName,
      quantity: createExpenseDto.quantity,
      price: createExpenseDto.price,
      userId: user.id,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll(query: QueryParamsDto) {
    const { take, page } = query;
    return this.expenses.slice((page - 1) * take, take * page);
  }

  findOne(id: number) {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);

    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    this.expenses[index] = {
      id: this.expenses[index].id,
      category: updateExpenseDto.category || this.expenses[index].category,
      productName:
        updateExpenseDto.productName || this.expenses[index].productName,
      quantity: updateExpenseDto.quantity || this.expenses[index].quantity,
      price: updateExpenseDto.price || this.expenses[index].price,
      userId: this.expenses[index].userId,
    };
    return ['Expense updated', this.expenses[index]];
  }

  remove(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(index, 1);
    return ['Deleted succesfully', deletedExpense];
  }
}
