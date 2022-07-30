import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { ItemCategory } from './ItemCategory';

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      name: string;

    @ManyToOne(
      () => ItemCategory,
      (category: ItemCategory) => category.name,
      { cascade: true }
    )
      category: ItemCategory;

    @Column()
      priceNetto: number;

    @Column()
      VAT: number;

    @Column({ nullable: true })
      excise: number | null;

    @Column()
      overhead: number;

    @Column()
      available: boolean;

    getPrice(){
      let taxed = this.priceNetto + this.overhead;
      if (this.excise){
        taxed += this.excise;
      }
      taxed += taxed / 100 * this.VAT;
      return taxed;
    }
}
