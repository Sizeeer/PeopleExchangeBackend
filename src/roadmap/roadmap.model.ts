export type RoadmapModelData = {
  id: number;
  user_id: number;
  q1: string;
  q2: string;
  q3: string;
};

export class RoadmapModel {
  id: number;
  user_id: number;
  q1: string;
  q2: string;
  q3: string;

  constructor(data: RoadmapModelData) {
    Object.assign(this, data);
  }
}
