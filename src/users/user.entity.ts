import { AfterInsert, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }
}
