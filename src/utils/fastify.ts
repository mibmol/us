import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTClaims } from 'src/auth/utils';

export type Request = { claims?: JWTClaims } & FastifyRequest;
export type Reply = FastifyReply;
