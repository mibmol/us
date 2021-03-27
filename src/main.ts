require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const fastifyAdpter = new FastifyAdapter();

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdpter);
	app.enableCors({ maxAge: 9999999 });
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
