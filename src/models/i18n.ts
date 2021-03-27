import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { VARCHAR } from './constants';
import { Artist } from './music';

@Entity()
export class Country {
	@PrimaryColumn({ type: 'smallint' })
	id: number;

	@Column({ length: VARCHAR.lg })
	name: string;

	@Column({ length: 4 })
	alpha2code: string;

	@Column({ length: 6 })
	alpha3code: string;

	@Column({ length: VARCHAR.md })
	region: string;

	@Column({ length: VARCHAR.md })
	subregion: string;

	@Column({ length: VARCHAR.md })
	demonym: string;

	@Column({ length: VARCHAR.lg })
	capital: string;

	@Column({ type: 'json', default: '{}' })
	translations: any;

	@Column({ default: false, name: 'is_supported' })
	isSupported: boolean;

	@OneToMany(()=> Artist, artist=> artist.country)
	artists: Artist[]
}

@Entity({ name: 'app_languages' })
export class AppLanguages {
	@PrimaryColumn({ type: 'smallint' })
	id: number;

	@Column({ length: VARCHAR.lg })
	name: string;

	@Column({ length: VARCHAR.lg, name: 'native_name' })
	nativeName: string;

	@Column({ length: 4 })
	code2: string;

	@Column({ length: 6 })
	code3: string;

	@Column({ default: false, name: 'is_supported' })
	isSupported: boolean;
}
