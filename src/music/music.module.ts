import { Module } from '@nestjs/common';
import { MusicService } from './music.service';

@Module({
	imports: [MusicService]
})
export class MusicModule {}
