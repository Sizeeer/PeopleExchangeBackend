import {
  Body,
  Controller,
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
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';
import { ROLES } from 'src/constants/roles';
import { CreateRoadmapDto } from 'src/roadmap/dto/createRoadmap.dto';
import { UpdateRoadmapDto } from 'src/roadmap/dto/updateRoadmap.dto';
import { RoadmapService } from 'src/roadmap/roadmap.service';

@ApiTags('roadmap')
@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get()
  getById(@Query('userId', ParseIntPipe) userId: number) {
    console.log('userId', userId);
    return this.roadmapService.getRoadmapByUserId(userId);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Post()
  @UseGuards(RoleGuard(ROLES.TalentPerson))
  create(
    @Body() createRoadmapDto: CreateRoadmapDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;

    return this.roadmapService.create(userId, createRoadmapDto);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Put()
  @UseGuards(RoleGuard(ROLES.TalentPerson))
  update(
    @Body() updateRoadmapDto: UpdateRoadmapDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.roadmapService.update(userId, updateRoadmapDto);
  }
}
