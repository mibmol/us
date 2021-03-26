export type Config = {
	app: App;
	jwt: JWT;
};

export type App = {
	development: boolean;
	host: string;
	port: number;
};

export type JWT = {
	secret: string;
	expiration: number; // hours
};

export type Databases = {
	postgresql: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
		synchronize: boolean;
	};
};
