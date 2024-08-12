import { Test, TestingModule } from '@nestjs/testing';
import { UesersService } from './uesers.service';

describe('UesersService', () => {
  let service: UesersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UesersService],
    }).compile();

    service = module.get<UesersService>(UesersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
