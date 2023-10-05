import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Nomenklature } from '../../nomenklature/entities/nomenklature.entity';

@Entity()
export class Links {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Nomenklature, { eager: true })
  @JoinColumn({ name: 'nomenklatureId' })
  nomenklatureId: Nomenklature;

  @ManyToOne(() => Nomenklature)
  @JoinColumn({ name: 'parentId' })
  parentId: Nomenklature;

  @Column({ type: 'int' })
  kol: number;

}
