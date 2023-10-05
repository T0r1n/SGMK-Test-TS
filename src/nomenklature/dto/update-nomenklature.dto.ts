import { PartialType } from '@nestjs/mapped-types';
import { CreateNomenklatureDto } from './create-nomenklature.dto';

export class UpdateNomenklatureDto extends PartialType(CreateNomenklatureDto) {}
