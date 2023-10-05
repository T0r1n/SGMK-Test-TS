import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNomenklatureDto } from './dto/create-nomenklature.dto';
import { UpdateNomenklatureDto } from './dto/update-nomenklature.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nomenklature } from './entities/nomenklature.entity';
import { Repository } from 'typeorm';


@Injectable()
export class NomenklatureService {
  constructor(
    @InjectRepository(Nomenklature) private readonly nomenRepository: Repository<Nomenklature>,
  ){}

  async create(createNomenklatureDto: CreateNomenklatureDto) {
    const existNonen = await this.nomenRepository.findOne({
      where:{
        name: createNomenklatureDto.name,
      }
    })
    if(existNonen) throw new BadRequestException("Такой продукт уже существует.")

    const nomenklature = await this.nomenRepository.save({
      name: createNomenklatureDto.name,
      price: createNomenklatureDto.price
    })
    return { nomenklature };
  }

  async findAll() {
    return await this.nomenRepository.find();
  }

  async findOne(id: number): Promise<Nomenklature>{
    var nomenklature   = await this.nomenRepository.findOne({
      where: { id },
      relations: ["parentLink","parentLink.nomenklatureId"]});

      if (nomenklature && nomenklature.parentLink.length > 0) {
        const childNomenklatures: Nomenklature[] = await Promise.all(
            nomenklature.parentLink.map(link => this.findOne(link.nomenklatureId.id))
        );
        nomenklature.parentLink.forEach((link, index) => {
            link.nomenklatureId = childNomenklatures[index];
        });
    }

      
    return nomenklature;
  }

  update(id: number, updateNomenklatureDto: UpdateNomenklatureDto) {
    return `This action updates a #${id} nomenklature`;
  }

  remove(id: number) {
    return `This action removes a #${id} nomenklature`;
  }
}
