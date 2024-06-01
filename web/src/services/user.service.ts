import axios from 'axios';

const headers = (jwt: string) => {
	return {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	};
};

export default class UserService {
	static async getUser(jwt: string) {
		const res = await axios.get(`/api/user`, headers(jwt));
		return res.data;
	}

	static async getDictCards(jwt: string) {
		const res = await axios.get(`/api/user/getDictionary`, {
			...headers(jwt),
		});
		return res.data;
	}

	static async removeFromDict(jwt: string, id: number) {
		return await axios.post(
			`/api/user/removeFromDictionary?id=${id}`,
			{},
			headers(jwt),
		);
	}

	static async postUserGiveExp(jwt: string, exp: number) {
		return await axios.post(`/api/user/giveExp`, { exp }, headers(jwt));
	}

	static async postCardToDictionary(jwt: string, id: number) {
		return await axios.post(
			`/api/user/addToDictionary?id=${id}`,
			{},
			headers(jwt),
		);
	}

	static async postUserAddSwiped(jwt: string, swiped: number) {
		return await axios.post(
			`/api/user/incrementSwiped`,
			{ swiped },
			headers(jwt),
		);
	}
}
