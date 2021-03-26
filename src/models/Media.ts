import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Media {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ enum: ['cover', 'profile', 'profile_banner'] })
	type: string;

	@Column({ type: 'json' })
	uris: {
		small: string;
		medium: string;
		large: string;
	};
}
