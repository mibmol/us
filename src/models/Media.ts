import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum MediaType {
	IMAGE = 'image',
	VIDEO = 'video',
}

@Entity()
export class Media {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ enum: MediaType, default: MediaType.IMAGE })
	type: string;

	@Column({ type: 'json', name: 'pic_uris', default: '{}' })
	picURIs: {
		small: string;
		medium: string;
		large: string;
	};

	@Column({ type: 'json', name: 'video_uris', default: '{}' })
	videoURIs: {
		'480p': string;
		'720p': string;
		'1080p': string;
		'4k': string;
	};
}
