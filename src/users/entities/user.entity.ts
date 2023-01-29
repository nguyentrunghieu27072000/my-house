import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  MENBER = 'MEMBER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  UserIp: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MENBER,
  })
  role: string;

  @Column({ default: 0, type: 'decimal' })
  moneyTotal: number;

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: string;
}
