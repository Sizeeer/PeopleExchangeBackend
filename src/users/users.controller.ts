import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/constants/roles';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';

import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard(ROLES.Investor))
  getAll() {
    return this.usersService.getAll();
  }

  @Put(':id')
  @UseGuards(RoleGuard(ROLES.Investor))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
