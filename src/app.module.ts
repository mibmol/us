import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './configuration';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MusicModule } from './music/music.module';
import { TorrentModule } from './torrent/torrent.module';


@Module({
	imports: [
		ConfigModule.forRoot({ load: [configurations] }),
		TypeOrmModule.forRoot(),
		UserModule,
		AuthModule,
		MusicModule,
		TorrentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
