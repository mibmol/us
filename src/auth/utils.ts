import { User, UserRole } from 'src/models/User';
import { v4 as uuidv4 } from 'uuid';
import { sign, verify } from 'jsonwebtoken';
import { nowSeconds } from 'src/utils/utils';
import { JWT } from 'src/configsTypes';
import { SECONDS_A_HOUR } from 'src/utils/dates';

// JWTClaims jc
export type JWTClaims = {
	jti?: string; // token id
	iat?: number; // IssuedAt
	exp?: number; //Expiry
	iss?: string; //Issuer
	sub?: string; //Subject
	aud?: string; //Audience
	extras?: { username: string; role: UserRole; active: boolean }; // username
};

export function createJWT(user: User, config: JWT): string {
	let claims: JWTClaims = {
		jti: uuidv4(),
		iat: nowSeconds(),
		sub: user.id,
		iss: 'https://usmusic.io',
		extras: {
			username: user.username,
			role: user.role as UserRole,
			active: user.isActive,
		},
	};

	let token = sign(claims, config.secret, { expiresIn: config.expiration * SECONDS_A_HOUR });

	return token;
}

export function validateJWT(token: string, config: JWT): JWTClaims {
	try {
		let obj = verify(token, config.secret);
		return obj as JWTClaims;
	} catch (error) {
		return null;
	}
}

export function matchRole(requiredRoles: UserRole[], actualRole: UserRole): boolean {
	for (let role of requiredRoles) {
		if (role === actualRole) {
			return true;
		}
	}
	return false;
}
