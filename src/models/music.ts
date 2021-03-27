import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { Country } from './i18n';
import { Torrent } from './Torrent';
import { User } from './User';

@Entity()
export class Genre {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.md })
	name: string;

	@OneToMany(() => ArtistGenre, (artistGenre) => artistGenre.genre)
	artistGenres: ArtistGenre[];
}

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

	@OneToOne(() => Genre)
	@JoinColumn({ name: 'genre_id' })
	genre: Genre;

	@Column({ type: 'bigint', name: 'play_count' })
	playCount: number;

	@Column({ type: 'boolean', name: 'has_torrent', default: false })
	hasTorrent: boolean;

	@Column({ type: 'jsonb', default: '[]' })
	torrents: {
		format: 'm4a' | 'mp3' | 'flac' | 'aac' | 'alac' | 'wma' | 'wav' | 'opus';
		default: boolean;
		torrent: Torrent;
	}[];

	@Column({ type: 'timestamptz', name: 'created_at', default: () => "timezone('utc', now())" })
	createdAt: string;

	@Column({ default: false })
	deleted: boolean;
}

export enum ReleaseType {
	ALBUM = 'album',
	SINGLE = 'single',
	EP = 'EP',
}
@Entity()
export class Release {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ enum: ReleaseType })
	type: string;

	@Column({ length: VARCHAR.lg })
	title: string;

	@Column({ type: 'jsonb', default: '[]' })
	tracks: Track[];

	@Column()
	year: number;
}

export enum ArtistType {
	PERSON = 'person',
	CHARECTER = 'character',
	GROUP = 'group',
}

@Entity()
export class Artist {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@Column({ length: VARCHAR.xl })
	name: string;

	@Column({ length: VARCHAR.md, enum: ArtistType })
	type: string;

	@ManyToOne(() => Country, (country) => country.artists)
	country: Country;

	@OneToMany(() => ArtistGenre, (artistGenre) => artistGenre.artist)
	artistGenres: ArtistGenre[];

	@Column({ type: 'timestamptz', name: 'created_at', default: () => "timezone('utc', now())" })
	createdAt: string;

	@Column({ default: false })
	deleted: boolean;
}

@Entity()
export class ArtistGenre {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@ManyToOne(() => Artist, (artist) => artist.artistGenres)
	artist: Artist;

	@ManyToOne(() => Genre, (genre) => genre.artistGenres)
	genre: Genre;
}

@Entity()
export class Playlist {
	@PrimaryColumn({ type: 'uuid' })
	id: string;

	@ManyToOne(() => User, (user) => user.playlists)
	user: User;

	@Column({ type: 'jsonb', default: '[]' })
	tracks: { index: number; track: Track };

	@Column({ type: 'timestamptz', name: 'created_at', default: () => "timezone('utc', now())" })
	createdAt: string;

	@Column({ default: false })
	deleted: boolean;
}
