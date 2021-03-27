import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Reply, Request } from './../utils/fastify';
import { UserService } from 'src/user/user.service';
import { ColaboratorSignup, UserSignup } from './dto';
import { JwtGuard, Roles } from 'src/auth/guards';
import { UserRole } from 'src/models/User';

@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('signup/basic')
	async signup(@Body() creds: UserSignup, @Res() res: Reply) {
		const { username, password } = creds;

		let user = await this.userService.getBy({ username });

		if (user !== null) {
			return res.status(HttpStatus.CONFLICT).send({ error: 'user already exists' });
		}

		let created = await this.userService.createOne({ username, password });
		if (!created) {
			return res.status(HttpStatus.CONFLICT).send({ error: 'could not create the user.' });
		}

		return res.send({ msg: 'done' });
	}

	@Post('signup/withemail')
	async signupEmail(@Body() creds: ColaboratorSignup, @Res() res: Reply) {
		const { username, email, password } = creds;

		let user = await this.userService.getBy({ username, email });

		if (user !== null) {
			return res.status(HttpStatus.CONFLICT).send({ error: 'user already exists' });
		}

		let created = await this.userService.createOne({ username, password, email });
		if (!created) {
			return res.status(HttpStatus.CONFLICT).send({ error: 'could not create the user.' });
		}

		return res.send({ msg: 'done' });
	}

	@Get('me')
	@UseGuards(JwtGuard)
	async me(@Req() req: Request, @Res() res: Reply) {
		let userId = req.claims.sub;

		return res.send({ profile: await this.userService.getProfile(userId) });
	}
}
