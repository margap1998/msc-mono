import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable 
} from 'typeorm';
import { Item } from './Item';
import { User } from './User';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      dateOfOrder: Date;

    @Column({ nullable: true })
      dateOfRealization: string;

    @ManyToOne(() => User, (user: User) => user.orders)
      client: User;
    
    @ManyToMany(() => Item)
    @JoinTable()
      items: Item[];
    
    @Column()
      orderInvoiceFileURI: string; 
}