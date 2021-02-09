export const ENCRYPTOR_KEY: string = 'MIIEowIBAAKA2LCcVqUelTOc6TwslUAm8vxnoCAQEt3hhlv8FjvjmZGqJ';

export const ALPHANUMERIC: string =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX: RegExp = /^.{6,20}$/;
