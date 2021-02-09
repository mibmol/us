import { User } from 'src/models/User';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

// JWTClaims jc
export type JWTClaims = {
	jti: string; // token id
	iat?: number; // IssuedAt
	exp?: number; //Expiry
	iss?: string; //Issuer
	sub?: string; //Subject
	aud?: string; //Audience
	username?: string; // username
};

export function createJWT(user: User, config: JWT): string {
	let claims: JWTClaims = {
		jti: uuidv4(),
		sub: user.username,
		iss: 'us',
	};

	let token = sign(claims, config.secret, { expiresIn: config.expiration });

	return token;
}
