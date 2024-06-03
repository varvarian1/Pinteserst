// eslint-disable-next-line import/named
import axios, { AxiosResponse } from 'axios';

export default class AuthService {
	static async getIsAuth(jwt: string) {
		const res = await axios.get(`/api/auth/isAuth`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		return res.data;
	}

	static async getAuthToken() {
		return await axios.get(`/api/auth/activation`);
	}

	static async getAuthCodeChangePassword(email: string) {
		return await axios.get(`/api/auth/changepassword?email=${email}`);
	}

	static async postLogin(
		username: string,
		password: string,
	): Promise<AxiosResponse<string, string>> {
		return await axios.post(`/api/auth/login`, { username, password });
	}

	static async postRegister(username: string, password: string, email: string) {
		const res = await axios.post(`/api/auth/register`, {
			username,
			password,
			email,
		});
		return res.data;
	}

	static async postAuthActivate(code: string) {
		return await axios.post(`/api/auth/activate`, { code });
	}

	static async postEmail(email: string) {
		return await axios.post(`/api/auth/isEmailExist`, { email });
	}

	static async postAuthChangePassword(newPassword: string, email: string) {
		return await axios.post(`/api/auth/changepassword`, { newPassword, email });
	}

	static async postAuthCodeCheck(code: string, email: string) {
		return await axios.post(`/api/auth/changepassword/code`, {
			code,
			email,
		});
	}
}
