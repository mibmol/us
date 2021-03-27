import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/User';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

	constructor(private readonly userService: UserService, private readonly config: ConfigService) {}

	async validateCreds(username: string, password: string): Promise<User> {
		let user = await this.userService.getBy({ username });
		if (!user || !user.comparePassword(password)) {
			return null;
		}
		return user;
	}
}
