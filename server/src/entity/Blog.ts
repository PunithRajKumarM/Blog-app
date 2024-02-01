import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column("bytea", { nullable: true })
  imageData: Buffer;
}
