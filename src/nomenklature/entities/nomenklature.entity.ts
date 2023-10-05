import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Links } from 'src/links/entities/link.entity';

@Entity()
export class Nomenklature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => Links, (links) => links.nomenklatureId)
  links:Links[];

  @OneToMany(() => Links, (links) => links.parentId)
  parentLink:Links[];
  
}
