import { Test, TestingModule } from '@nestjs/testing';
import { ArtificialIntelligenceController } from './artificial-intelligence.controller';
import { ArtificialIntelligenceService } from './artificial-intelligence.service';

describe('ArtificialIntelligenceController', () => {
  let controller: ArtificialIntelligenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtificialIntelligenceController],
      providers: [ArtificialIntelligenceService],
    }).compile();

    controller = module.get<ArtificialIntelligenceController>(ArtificialIntelligenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
