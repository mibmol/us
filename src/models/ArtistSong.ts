import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './Artist';
import { Song } from './Song';

@Entity()
export class ArtistSong {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@ManyToOne(() => Artist, (artist) => artist.songs)
	artist: Artist;

	@ManyToOne(() => Song, (song) => song.artists)
	song: Song;

	@Column({ default: true })
	isMainArtist: boolean;
}
