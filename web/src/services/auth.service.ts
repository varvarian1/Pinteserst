import axios from 'axios';

export default class AuthService {
	static async postLogin(username: string, password: string) {
		const response = await axios.post(
			'http://localhost:8000',
			{
				username,
				password,
			},
			{
				withCredentials: true,
			},
		);
		return response.data;
	}
}
