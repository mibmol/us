import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

	async getById(id: number): Promise<User> {
		let user = await this.usersRepo.findOne({ id });
		if (!user) return null;
		return user;
	}

	async getByEmail(email: string): Promise<User> {
		let user = await this.usersRepo.findOne({ email });
		if (!user) return null;
		return user;
	}

	async getByUsername(username: string): Promise<User> {
		let user = await this.usersRepo.findOne({ username });
		if (!user) return null;
		return user;
	}
}
