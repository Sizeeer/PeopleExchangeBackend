import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { RoadmapRepository } from 'src/roadmap/roadmap.repository';

@Module({
  controllers: [RoadmapController],
  providers: [RoadmapService, RoadmapRepository],
})
export class RoadmapModule {}
