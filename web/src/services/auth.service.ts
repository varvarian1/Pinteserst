import axios from 'axios';

export default class AuthService {
	static async postLogin(email: string, password: string) {
		const response = await axios.post(
			'http://localhost:8000',
			{
				email,
				password,
			},
			{
				withCredentials: true,
			},
		);
		return response.data;
	}
	static async postRegister(
		name: string,
		email: string,
		password: string,
		repeatPassword: string,
	) {
		const response = await axios.post(
			'http://localhost:8000',
			{
				name,
				email,
				password,
				repeatPassword,
			},
			{
				withCredentials: true,
			},
		);
		return response.data;
	}
}
