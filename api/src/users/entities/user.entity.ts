import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import AppEntity from 'src/app.entity';

@Entity()
export class User extends AppEntity {
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
