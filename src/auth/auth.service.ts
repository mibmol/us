import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/User';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	private MAX_SALT_ROUNDS: number = 16;

	constructor(private readonly userService: UserService, private readonly config: ConfigService) {}

	async validateCreds(username: string, password: string): Promise<User> {
		let user = await this.userService.getByUsername(username);

		if (!user) {
			return null;
		}
		if (!user.comparePassword(password)) {
			return null;
		}

		return user;
	}
}
