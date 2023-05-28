import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';
import { ROLES } from 'src/constants/roles';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get('me')
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  getMe(@Req() request) {
    try {
      return this.usersService.getUserWithWallet(request.user);
    } catch (err) {
      console.log('err', err);
      throw new Error(err);
    }
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get('talent')
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  getTalentPersons(@Query() queryParams: any) {
    try {
      return this.usersService.getTalentPersons(Number(queryParams?.page) || 1);
    } catch (err) {
      console.log('err', err);
      throw new Error(err);
    }
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @UseGuards(RoleGuard(ROLES.Admin))
  @Post('ban/:id')
  ban(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.ban(id);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get(':id')
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get('talent/:id')
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  getTalentUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getTalentUserById(id);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Put(':id')
  @UseGuards(RoleGuard(ROLES.TalentPerson, ROLES.Investor))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @UseGuards(RoleGuard(ROLES.Admin, ROLES.Investor, ROLES.TalentPerson))
  @Delete(':id')
  deleteUserAccount(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserAccount(id);
  }
}
