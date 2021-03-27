import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CorsMiddleware } from './middlewares';

@Module({
	controllers: [AdminController],
})
export class AdminModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
