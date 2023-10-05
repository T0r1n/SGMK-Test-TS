import { IsEmail, IsNumber } from "class-validator";

export class ParentLinkDto {
    nomenkllatureId: number;
    kol: number;
  }

export class CreateNomenklatureDto {
    name: string;
    
    @IsNumber()
    price: number;
    parentLink: ParentLinkDto[];
}
