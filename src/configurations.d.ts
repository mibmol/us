type Config = {
	app: App;
	jwt: JWT;
};

type App = {
	development: boolean;
	host: string;
	port: number;
};

type JWT = {
	secret: string;
	expiration: number; // hours
};

type Databases = {
	postgresql: {
		host: string;
		port: number;
		username: string;
		password: string;
		database: string;
		synchronize: boolean;
	};
};
