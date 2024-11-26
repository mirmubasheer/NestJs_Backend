import { Test, TestingModule } from '@nestjs/testing';
import { VentureController } from './venture.controller';

describe('VentureController', () => {
  let controller: VentureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentureController],
    }).compile();

    controller = module.get<VentureController>(VentureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
