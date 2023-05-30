import { Injectable } from '@nestjs/common';
import { CreateRoadmapDto } from 'src/roadmap/dto/createRoadmap.dto';
import { UpdateRoadmapDto } from 'src/roadmap/dto/updateRoadmap.dto';
import { RoadmapRepository } from 'src/roadmap/roadmap.repository';

@Injectable()
export class RoadmapService {
  constructor(private readonly roadmapsRepository: RoadmapRepository) {}

  async getRoadmapByUserId(userId: number) {
    const roadmap = await this.roadmapsRepository.getByUserId(userId);

    return roadmap;
  }

  async create(userId: number, createRoadmapDto: CreateRoadmapDto) {
    try {
      await this.roadmapsRepository.create(userId, createRoadmapDto);
    } catch (e) {
      console.error(e);
      throw new Error(`Создание roadmap не удалось. User Id - ${userId}`);
    }
  }

  async update(userId: number, updateRoadmapDto: UpdateRoadmapDto) {
    try {
      await this.roadmapsRepository.update(userId, updateRoadmapDto);
    } catch (e) {
      console.error(e);
      throw new Error(`Обновление roadmap не удалось. User Id - ${userId}`);
    }
  }
}
