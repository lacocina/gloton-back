import { Entity } from 'typeorm'
import {GeoCoordinates} from "schema-dts";
import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MenuCategory} from "./MenuCategory.ts";

@Entity()
export class FoodEstablishment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  geo: GeoCoordinates;

  @Column()
  url: string;

  @Column()
  telephone: string;

  @Column()
  openingHours: string;

  @Column()
  priceRange: string;

  @Column()
  image: string;

  @Column()
  acceptsReservations: boolean;

  @Column()
  servesCuisine: string;

  @OneToMany(() => MenuCategory, menuCategory => menuCategory.foodEstablishment, {cascade: true})
  menu: MenuCategory[];
}
