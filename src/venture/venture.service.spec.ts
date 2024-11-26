import { Test, TestingModule } from '@nestjs/testing';
import { VentureService } from './venture.service';

describe('VentureService', () => {
  let service: VentureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VentureService],
    }).compile();

    service = module.get<VentureService>(VentureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
