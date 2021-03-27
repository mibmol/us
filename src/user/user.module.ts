import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';
import { UserService } from './user.service';
import {UserController} from './user.controller'
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, ConfigService],
	exports: [UserService],
	controllers: [UserController]
})
export class UserModule {}
