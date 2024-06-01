import axios from 'axios';

const headers = (jwt: string) => {
	return {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	};
};

const params = (limit: number) => {
	if (limit !== 0) {
		return {
			params: {
				limit: limit,
			},
		};
	}
};

export default class TrainService {
	static async getTrain(jwt: string, limit: number = 0) {
		const res = await axios.get(`/api/train`, {
			...headers(jwt),
			...params(limit),
		});
		return res.data;
	}

	static async getTrainStart(jwt: string, id: number) {
		const res = await axios.get(`/api/train/start?id=${id}`, {
			...headers(jwt),
		});
		return res.data;
	}
}
