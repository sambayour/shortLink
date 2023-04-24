import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({
  name: 'links',
})
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  link: string;

  @Column({
    default: 0,
    type: 'bigint',
  })
  redirect: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
