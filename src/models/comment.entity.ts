import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column()
  @AutoMap()
  Text: string;

  @JoinColumn({ name: 'ArticleId' })
  @AutoMap()
  ArticleId: number;

  @Column()
  @AutoMap()
  By: string;


}