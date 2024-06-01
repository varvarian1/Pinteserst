import axios from 'axios';

const headers = (jwt: string, contentType: string = '') => {
	if (contentType !== '') {
		return {
			headers: {
				Authorization: `Bearer ${jwt}`,
				'Content-Type': '',
			},
		};
	}
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

export default class CardsService {
	static async getCards(jwt: string, limit: number = 0) {
		const res = await axios.get(`/api/cards`, {
			...headers(jwt),
			...params(limit),
		});
		return res.data;
	}

	static async getOwnCards(jwt: string) {
		const res = await axios.get(`/api/cards/byAuthor`, {
			...headers(jwt),
		});
		return res.data;
	}

	static async getCard(jwt: string, id: number) {
		const res = await axios.get(`/api/cards/getCard?id=${id}`, headers(jwt));
		return res.data;
	}

	static async postCardUpdate(
		jwt: string,
		id: number,
		engtext: string,
		rustext: string,
		image?: FileList | string | null,
	) {
		const update = await axios.post(
			'/api/cards/update',
			{
				engtext: engtext,
				rustext: rustext,
				id: id,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			},
		);
		if (
			image !== null &&
			image !== undefined &&
			image?.length > 0 &&
			typeof image !== 'string'
		) {
			const formData = new FormData();
			formData.append('id', id.toString());
			formData.append('image', image[image.length - 1]);
			const imageUpd = await axios.post(
				'/api/cards/updateImage',
				formData,
				headers(jwt),
			);
			return { update, imageUpd };
		} else {
			const imageUpd = await axios.post(
				'/api/cards/deleteImage',
				{ id },
				headers(jwt),
			);
			return { update, imageUpd };
		}
	}

	static async postCardUpdateImage(jwt: string, formData: FormData) {
		return await axios.post(`/api/cards/updateImage`, formData, headers(jwt));
	}

	static async postCardCreate(
		jwt: string,
		contentType: string,
		engtext: string,
		rustext: string,
		image?: FileList,
		catid?: number,
	) {
		if (image === undefined || image?.length === 0) {
			return CardsService.postCardCreateWithoutImg(
				jwt,
				engtext,
				rustext,
				catid,
			);
		}
		const formdata = new FormData();
		formdata.append('image', image[image.length - 1]);
		formdata.append('engtext', engtext);
		formdata.append('rustext', rustext);
		if (catid !== undefined) {
			formdata.append('catid', catid.toString());
			return await axios.post(
				`/api/categories/add`,
				formdata,
				headers(jwt, contentType),
			);
		}
		return await axios.post(
			`/api/cards/create`,
			formdata,
			headers(jwt, contentType),
		);
	}

	static async postCardCreateWithoutImg(
		jwt: string,
		engtext: string,
		rustext: string,
		catid?: number,
	) {
		if (catid !== undefined)
			return await axios.post(
				`/api/categories/addWithoutImage`,
				{
					engtext,
					rustext,
					catid,
				},
				headers(jwt),
			);
		return await axios.post(
			`/api/cards/createWithoutImage`,
			{
				engtext: engtext,
				rustext: rustext,
			},
			headers(jwt),
		);
	}
}
