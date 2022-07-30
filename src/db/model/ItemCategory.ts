import {
  BaseEntity,
  Entity, OneToMany,
  PrimaryColumn,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm';
import { Item } from './Item';


@Entity()
@Tree('materialized-path')
export class ItemCategory extends BaseEntity {
  @PrimaryColumn()
    name: string;

  @TreeParent()
    parentCategory: ItemCategory;

  @TreeChildren()
    subcategories: ItemCategory[];
  
  @OneToMany(() => Item, (item: Item) => item.category)
    items: Item[];
}
