import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reply } from './../utils/fastify';
import { UserLogin } from './dto';
import { createJWT } from './utils';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export default class AuthController {
	private JWTConfig: JWT;
	constructor(private readonly authService: AuthService, private readonly config: ConfigService) {
		this.JWTConfig = this.config.get<JWT>('jwt');
	}

	@Post('local')
	@UsePipes(ValidationPipe)
	async local(@Body() creds: UserLogin, @Res() res: Reply) {
		let user = await this.authService.validateCreds(creds.username, creds.password);
		if (!user) {
			return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'unauthorized' });
		}
		return res.send({ token: createJWT(user, this.JWTConfig) });
	}
}
