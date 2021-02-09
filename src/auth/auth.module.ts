import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule],
	providers: [UserService, ConfigService, AuthService],
})
export class AuthModule {}
