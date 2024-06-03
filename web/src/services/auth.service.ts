import axios from 'axios';

export default class AuthService {
	static async postToken() {
		const response = await axios.post('/api/token/');
		return response.data;
	}
	static async postLogin(email: string, password: string) {
		const response = await axios.post(
			'/api/token/',
			{
				email,
				password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
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
