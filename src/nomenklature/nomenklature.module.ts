import { Module } from '@nestjs/common';
import { NomenklatureService } from './nomenklature.service';
import { NomenklatureController } from './nomenklature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nomenklature } from './entities/nomenklature.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Nomenklature])
  ],
  controllers: [NomenklatureController],
  providers: [NomenklatureService],
})
export class NomenklatureModule {}
