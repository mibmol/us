import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDBs, loadAppConfigs } from './configs';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TorrentModule } from './torrent/torrent.module';
import { User, Torrent } from './models';
import { Artist, ArtistGenre, Genre, Playlist, Release, Track } from './models/music';
import { Media } from './models/Media';
import { AppLanguages, Country } from './models/i18n';
// import { AdminModule } from './admin/admin.module';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [loadAppConfigs] }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			...getDBs().postgresql,
			entities: [
				User,
				Torrent,
				Track,
				Artist,
				ArtistGenre,
				Genre,
				Release,
				Playlist,
				Media,
				Country,
				AppLanguages,
			],
		}),
		UserModule,
		AuthModule,
		TorrentModule,
		// AdminModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
