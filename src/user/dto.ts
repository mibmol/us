import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserSignup {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}

export class ColaboratorSignup {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
