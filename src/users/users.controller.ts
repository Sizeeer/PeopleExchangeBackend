import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';
import { ROLES } from 'src/constants/roles';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('talent')
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  getTalentPersons(@Query() queryParams: any) {
    return this.usersService.getTalentPersons(Number(queryParams?.page) || 1);
  }

  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: 'Возвращает пользователя по id админу',
  })
  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get(':id')
  @UseGuards(RoleGuard(ROLES.Admin))
  getAll(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard(ROLES.Investor))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(RoleGuard(ROLES.Admin))
  @Post('ban/:id')
  ban(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.ban(id);
  }

  @UseGuards(RoleGuard(ROLES.Admin))
  @Delete(':id')
  deleteUserAccount(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserAccount(id);
  }
}
