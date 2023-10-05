import { Test, TestingModule } from '@nestjs/testing';
import { NomenklatureService } from './nomenklature.service';

describe('NomenklatureService', () => {
  let service: NomenklatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomenklatureService],
    }).compile();

    service = module.get<NomenklatureService>(NomenklatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
