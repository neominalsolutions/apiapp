
// Entity

import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// TypeORM
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  @AutoMap()
  Id: number;

  @Column({ unique: true }) // Unique Index tanımı yaptık
  @AutoMap()
  Name: string;

  @Column()
  @AutoMap()
  Content: string;

  @Column({ type: 'nvarchar' })
  @AutoMap()
  Description?: string;

  @Column()
  @AutoMap()
  PublishedAt?: Date;

  @Column()
  @AutoMap()
  PublishedBy?: string;

  @Column({ type: 'date' })
  @AutoMap()
  CreatedAt?: Date;

  @Column({ type: 'bit' })
  @AutoMap()
  Published: boolean;

  // 1'e çok ilişkili durumlar için kullanırız.
  @OneToMany((type => Article), article => article.Comments)
  @AutoMap()
  Comments: Comment[]; // navigation property, Include Comments


  publish(by: string) {
    this.PublishedAt = new Date();
    this.Published = true;
    this.PublishedBy = by;
  }
}

