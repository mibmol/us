import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { Country } from './i18n';
import { Torrent } from './Torrent';

@Entity()
export class Track {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ type: 'smallint', name: 'track_number', default: 0 })
	trackNumber: number;

	@Column({ length: VARCHAR.lg })
	title: string;

	@Column({ type: 'smallint' })
	duration: number; // seconds

	@Column({ type: 'bigint', name: 'play_count' })
	playCount: number;

	@Column({ type: 'boolean', name: 'has_torrent', default: false })
	hasTorrent: boolean;

	@Column({ type: 'jsonb' })
	torrents: {
		format: 'm4a' | 'mp3' | 'flac' | 'aac' | 'alac' | 'wma' | 'wav';
		default: boolean;
		torrent: Torrent;
	}[];
}

@Entity()
export class Release {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ enum: ['album', 'single', 'EP'] })
	type: string;

	@Column({ length: VARCHAR.lg })
	title: string;

	@Column({ type: 'jsonb' })
	tracks: string[];

	@Column()
	year: number;
}

@Entity()
export class Artist {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.xl })
	name: string;

	@ManyToOne(() => Country, (country) => country.artists)
	country: string;
}
