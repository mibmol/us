import { NestMiddleware } from '@nestjs/common';
import { Reply, Request } from 'src/utils/fastify';

export class CorsMiddleware implements NestMiddleware {
	use(req: Request, res: Reply, next: () => void) {
		console.log(req.headers, req.ip, req.id);
		next();
	}
}
