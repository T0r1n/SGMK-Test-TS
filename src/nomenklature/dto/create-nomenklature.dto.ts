import { IsString, IsNumber, ValidateNested } from 'class-validator';

export class ParentLinkDto {
  @IsNumber()
  nomenkllatureId: number;

  @IsNumber()
  kol: number;
}

export class CreateNomenklatureDto {
  @IsString()
  name: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  price: number;

  @ValidateNested()
  parentLink: ParentLinkDto[];
}

