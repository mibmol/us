import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [ConfigModule, UserModule],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
