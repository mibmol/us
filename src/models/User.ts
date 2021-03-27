import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { Playlist } from './music';
import { Torrent } from './Torrent';
import { hash, compare } from 'bcrypt';
import { randomInt } from 'src/utils/utils';

const MAX_SALT_ROUND = 12;

export enum UserRole {
	ADMIN = 'admin',
	COLABORATOR = 'colaborator',
	USER = 'user',
}

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.sm, unique: true, nullable: false })
	@Index('users_username_index', { unique: true })
	username: string;

	@Column({ length: VARCHAR.lg, nullable: true })
	@Index('users_email_index', { unique: true })
	email: string;

	@Column({ length: VARCHAR.lg, name: 'password_hash' })
	private passwordHash: string;

	@Column({ type: 'boolean', default: false })
	verified: boolean;

	@Column({ enum: UserRole, default: UserRole.USER })
	role: string;

	@Column({ type: 'timestamptz', name: 'created_at', default: () => "timezone('utc', now())" })
	createdAt: string;

	@Column({ default: false })
	deleted: boolean;

	@Column({ default: true, name: 'is_active' })
	isActive: boolean;

	@OneToMany(() => Torrent, (torrent) => torrent.uploader)
	torrents: Torrent[];

	@OneToMany(() => Playlist, (playlist) => playlist.user)
	playlists: Playlist[];

	getPasswordHash(): string {
		return this.passwordHash;
	}

	async setPasswordHash(password: string): Promise<boolean> {
		try {
			this.passwordHash = await hash(password, randomInt({ min: 4, max: MAX_SALT_ROUND }));
			return true;
		} catch (error) {
			return false;
		}
	}

	async comparePassword(password: string): Promise<boolean> {
		try {
			let match = await compare(password, this.passwordHash);
			return match;
		} catch (error) {
			return false;
		}
	}
}
