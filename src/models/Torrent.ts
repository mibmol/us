import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { User } from './User';

@Entity()
export class Torrent {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.xl3 })
	magnet: string;

	@Column({ length: VARCHAR.xl2, name: 'file_url' })
	fileURL: string;

	@ManyToOne(() => User, (user) => user.torrents)
	uploader: User;

	@Column({ default: false })
	deleted: boolean;

	@Column({ type: 'timestamptz', name: 'created_at' })
	createdAt: string;
}
