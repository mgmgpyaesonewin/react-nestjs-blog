import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

abstract class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}

export default AppEntity;
