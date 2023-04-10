import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MenuItem} from "./MenuItem.ts";
import {FoodEstablishment} from "./Business.ts";

export class MenuCategory {
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

  @OneToMany(() => MenuItem, menuItem => menuItem.menuCategory, {cascade: true})
  menuItems: MenuItem[];

  @ManyToOne(() => FoodEstablishment, foodEstablishment => foodEstablishment.menu, {cascade: true})
  foodEstablishment: FoodEstablishment;
}
