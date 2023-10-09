import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (typeof createNomenklatureDto.price !== 'number' || createNomenklatureDto.name === '') {
      throw new BadRequestException("Некорректный формат данных.");
    }
  
    const existNomen = await this.nomenRepository.findOne({
      where: {
        name: createNomenklatureDto.name,
      },
    });
  
    if (existNomen) {
      throw new BadRequestException("Такой продукт уже существует.");
    }
  
    const nomenklature = await this.nomenRepository.save({
      name: createNomenklatureDto.name,
      price: createNomenklatureDto.price,
    });
  
    return { nomenklature };
  }

  async findAll() {
    return await this.nomenRepository.find();
  }

  async findOne(id: number, parentQuantity: number = 1): Promise<any> {
    const nomenklature = await this.nomenRepository.findOne({
        where: { id },
        relations: ["parentLink", "parentLink.nomenklatureId"],
    });

    if (!nomenklature) {
        throw new NotFoundException(`Продукт с Id ${id} не обнаружен`);
    }

    let totalCost = nomenklature.price * parentQuantity;
    const childProducts: any[] = [];

    if (nomenklature.parentLink && nomenklature.parentLink.length > 0) {
        for (const link of nomenklature.parentLink) {
            const childProduct = link.nomenklatureId;
            const childQuantity = link.kol;  
            const childProductInfo = await this.findOne(childProduct.id, childQuantity);
            totalCost += childProductInfo.totalCost * parentQuantity;
            childProducts.push(childProductInfo);
        }
    }

    return {
        id: nomenklature.id,
        name: nomenklature.name,
        price: nomenklature.price,
        quantity: parentQuantity,
        totalCost,
        childProducts,
    };
}

  update(id: number, updateNomenklatureDto: UpdateNomenklatureDto) {
    return `This action updates a #${id} nomenklature`;
  }

  remove(id: number) {
    return `This action removes a #${id} nomenklature`;
  }
}
