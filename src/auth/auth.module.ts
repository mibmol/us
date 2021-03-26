import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, UserModule],
	providers: [AuthService],
})
export class AuthModule {}
