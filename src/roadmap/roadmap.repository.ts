import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoadmapDto } from 'src/roadmap/dto/createRoadmap.dto';
import { UpdateRoadmapDto } from 'src/roadmap/dto/updateRoadmap.dto';
import { RoadmapModel } from 'src/roadmap/roadmap.model';

@Injectable()
export class RoadmapRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getByUserId(userId: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * from Roadmaps WHERE user_id = $1`,
      [userId],
    );

    const entity = databaseResponse.rows[0] as any;

    if (!entity) {
      return null;
    }

    return plainToInstance(RoadmapModel, entity);
  }

  async create(userId: number, createData: CreateRoadmapDto) {
    try {
      await this.databaseService.runQuery(
        `INSERT INTO Roadmaps (user_id, q1, q2, q3) VALUES($1, $2, $3, $4);`,
        [userId, createData.q1, createData.q2, createData.q3],
      );
    } catch (error) {
      throw error;
    }
  }

  async update(userId: number, updateRoadmapDto: UpdateRoadmapDto) {
    try {
      await this.databaseService.runQuery(
        `UPDATE Roadmaps
        SET 
            q1 = COALESCE($2, Roadmaps.q1),
            q2 = COALESCE($3, Roadmaps.q2),
            q3 = COALESCE($4, Roadmaps.q3)
        WHERE Roadmaps.user_id = $1;`,
        [userId, updateRoadmapDto.q1, updateRoadmapDto.q2, updateRoadmapDto.q3],
      );
    } catch (error) {
      throw error;
    }
  }
}
