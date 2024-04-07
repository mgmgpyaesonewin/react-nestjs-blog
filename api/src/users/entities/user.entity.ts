import { IsEmail, IsString } from 'class-validator';
import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import AppEntity from 'src/app.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User extends AppEntity {
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
