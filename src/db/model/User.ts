import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany 
} from 'typeorm';
import { Order } from './Order';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
      firstName: string;
      
    @Column({ nullable: true })
      password: string;

    @Column()
      lastName: string;
    
    @Column({ default: 'all', nullable: true })
      role: string;

    @Column({ unique: true })
      email: string;

    @Column({ unique: true })
      phoneNumber: string;

    @Column({ default: true, nullable: true })
      isActive: boolean;

    @OneToMany(() => Order, (order: Order) => order.client.id)
      orders: Order[];
}

