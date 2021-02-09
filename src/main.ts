import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const fastifyAdpter = new FastifyAdapter();

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdpter);
	await app.listen(3000);
}
bootstrap();
