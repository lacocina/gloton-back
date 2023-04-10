import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MenuCategory} from "./MenuCategory.ts";

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  show: boolean;

  @ManyToOne(() => MenuCategory, menuCategory => menuCategory.menuItems, {cascade: true})
  menuCategory: MenuCategory;
}
