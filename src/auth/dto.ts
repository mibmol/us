import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLogin {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}

export class UserEmail {
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
