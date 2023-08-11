import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column()
  @AutoMap()
  Text: string;

  @ManyToOne(type => Article)
  @JoinColumn({ name: 'ArticleId' })
  @AutoMap()
  ArticleId: number;

  @Column()
  @AutoMap()
  By: string;


}