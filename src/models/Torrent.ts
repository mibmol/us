import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VARCHAR } from './constants';

@Entity()
export class Torrent {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ length: VARCHAR.xlg })
	name: string;

	@Column({ default: false })
	deleted: boolean;
}
