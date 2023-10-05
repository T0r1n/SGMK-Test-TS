import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomenklatureService } from './nomenklature.service';
import { CreateNomenklatureDto } from './dto/create-nomenklature.dto';
import { UpdateNomenklatureDto } from './dto/update-nomenklature.dto';

@Controller('nomenklature')
export class NomenklatureController {
  constructor(private readonly nomenklatureService: NomenklatureService) {}

  @Post()
  create(@Body() createNomenklatureDto: CreateNomenklatureDto) {
    return this.nomenklatureService.create(createNomenklatureDto);
  }

  @Get()
  findAll() {
    return this.nomenklatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomenklatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomenklatureDto: UpdateNomenklatureDto) {
    return this.nomenklatureService.update(+id, updateNomenklatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomenklatureService.remove(+id);
  }
}
