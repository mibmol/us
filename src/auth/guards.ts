import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JWT } from 'src/configsTypes';
import { UserRole } from 'src/models/User';
import { Request } from 'src/utils/fastify';
import { matchRole, validateJWT } from './utils';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtGuard implements CanActivate {
	private JWTConfig: JWT;

	constructor(private reflector: Reflector, private readonly configs: ConfigService) {
		this.JWTConfig = this.configs.get<JWT>('jwt');
	}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();
		let [prefix, token] = (request.headers.authorization || '').split(' ');

		if (!token || prefix !== 'Bearer') return false;

		let claims = validateJWT(token, this.JWTConfig);
		if (!claims) return false;

		request['claims'] = claims;

		const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		return matchRole(roles, claims.extras.role);
	}
}
