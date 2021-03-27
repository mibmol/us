import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User';
import { to } from 'src/utils/utils';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

	async getBy(q: { id?: string; username?: string; email?: string }): Promise<User> {
		const { id, email, username } = q;
		if (!id && !email && !username) return null;

		let [user, error] = await to(
			this.usersRepo.findOne({ where: [{ id }, { username }, { email }] }),
		);
		console.error(error);

		return user;
	}

	async getProfile(id: string): Promise<User> {
		let [user] = await to(this.usersRepo.findOne({ id }, {}));
		if (user !== null) {
			delete user['passwordHash'];
			delete user['email'];
		}
		return user;
	}

	async createOne(userInput: {
		username: string;
		password: string;
		email?: string;
	}): Promise<User> {
		const newId = uuidv4();
		const { username, password, email } = userInput;
		let newUser: User;
		if (!email) {
			newUser = this.usersRepo.create({
				id: newId,
				username,
			});
		} else {
			newUser = this.usersRepo.create({
				id: newId,
				username,
				email,
			});
		}

		if (!(await newUser.setPasswordHash(password))) {
			return null;
		}

		let [savedUser, error] = await to(this.usersRepo.save(newUser));
		console.log(error);
		return savedUser;
	}
}
