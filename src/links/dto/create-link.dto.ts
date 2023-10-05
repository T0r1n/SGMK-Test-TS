import { Nomenklature } from '../../nomenklature/entities/nomenklature.entity';

export class CreateLinkDto {
    nomenklatureId: Nomenklature;
    parentId: Nomenklature;
    kol: number;
}
