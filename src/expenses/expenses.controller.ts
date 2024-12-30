import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { QueryParamsDto } from './dto/queryParams.dto';
import { ExistUser } from 'src/guards/existUser.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(ExistUser)
  create(@Body() createExpenseDto: CreateExpenseDto, @Req() request) {
    const userId = request.userId
    return this.expensesService.create(createExpenseDto,userId);
  }

  @Get()
  findAll(@Query() query: QueryParamsDto) {
    return this.expensesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expensesService.remove(id);
  }
}
