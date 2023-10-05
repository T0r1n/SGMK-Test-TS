import { Test, TestingModule } from '@nestjs/testing';
import { NomenklatureController } from './nomenklature.controller';
import { NomenklatureService } from './nomenklature.service';

describe('NomenklatureController', () => {
  let controller: NomenklatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomenklatureController],
      providers: [NomenklatureService],
    }).compile();

    controller = module.get<NomenklatureController>(NomenklatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
