import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VARCHAR } from './constants';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: VARCHAR.md })
	displayName: string;

	@Column({ length: VARCHAR.sm, unique: true, nullable: false })
	username: string;

	@Column({ length: VARCHAR.lg, unique: true, nullable: false })
	email: string;

	@Column({ length: VARCHAR.lg })
	private password: string;

	@Column({ type: 'boolean', default: false })
	verified: boolean;

	@Column({ type: 'timestamp with time zone' })
	dateJoined: string;

	@Column({ default: true })
	isActive: boolean;

	getPasswordHash(): string {
		return this.password;
	}

	setPasswordHash(password: string) {
		this.password = password;
	}

	comparePassword(password: string): boolean {
		return this.password === password;
	}
}
