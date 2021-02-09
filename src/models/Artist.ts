import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistSong } from './ArtistSong';
import { VARCHAR } from './constants';

@Entity()
export class Artist {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number;

	@Column({ length: VARCHAR.md })
	name: string;

	@OneToMany(() => ArtistSong, (artistSong) => artistSong.song)
	songs: ArtistSong[];
}
