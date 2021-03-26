import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { Torrent } from './Torrent';

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.md, name: 'display_name' })
	displayName: string;

	@Column({ length: VARCHAR.sm, unique: true, nullable: false })
	@Index('users_username_index', { unique: true })
	username: string;

	@Column({ length: VARCHAR.lg, nullable: false })
	@Index('users_email_index', { unique: true })
	email: string;

	@Column({ length: VARCHAR.lg })
	private passwordHash: string;

	@Column({ type: 'boolean', default: false })
	verified: boolean;

	@Column({ default: false, name: 'is_staff' })
	isStaff: boolean;

	@Column({ type: 'timestamptz', name: 'created_at' })
	createdAt: string;

	@Column({ default: false })
	deleted: boolean;

	@Column({ default: true, name: 'is_active' })
	isActive: boolean;

	@OneToMany(() => Torrent, (torrent) => torrent.uploader)
	torrents: Torrent[];

	getPasswordHash(): string {
		return this.passwordHash;
	}

	setPasswordHash(password: string) {
		this.passwordHash = password;
	}

	comparePassword(password: string): boolean {
		return this.passwordHash === password;
	}
}
