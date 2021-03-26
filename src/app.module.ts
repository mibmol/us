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

@Module({
	imports: [
		ConfigModule.forRoot({ load: [loadAppConfigs] }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			...getDBs().postgresql,
			entities: [User, Torrent],
		}),
		UserModule,
		AuthModule,
		TorrentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
