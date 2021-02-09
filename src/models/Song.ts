import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistSong } from './ArtistSong';
import { VARCHAR } from './constants';

@Entity()
export class Song {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ length: VARCHAR.md })
	title: string;

	@OneToMany(() => ArtistSong, (artistSong) => artistSong.artist)
	artists: ArtistSong[];
}
