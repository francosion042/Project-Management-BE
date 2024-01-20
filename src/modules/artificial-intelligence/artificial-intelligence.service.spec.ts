import { Test, TestingModule } from '@nestjs/testing';
import { ArtificialIntelligenceService } from './artificial-intelligence.service';

describe('ArtificialIntelligenceService', () => {
  let service: ArtificialIntelligenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtificialIntelligenceService],
    }).compile();

    service = module.get<ArtificialIntelligenceService>(ArtificialIntelligenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
