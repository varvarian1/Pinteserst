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

export default class CategoryService {
	static async getAllCategories(jwt: string, limit: number = 10) {
		const res = await axios.get(`/api/categories/getall`, {
			...headers(jwt),
			...params(limit),
		});
		return res.data;
	}

	static async getCategory(jwt: string, id: number) {
		const res = await axios.get(`/api/categories?id=${id}`, headers(jwt));
		return res.data;
	}

	static async getCategoryByName(jwt: string, name: string) {
		const res = await axios.get(`/api/categories/getByName`, {
			...headers(jwt),
			params: {
				name: name,
			},
		});
		return res.data;
	}

	static async getCategoryCards(jwt: string, id: number) {
		const res = await axios.get(
			`/api/categories/getCards?id=${id}`,
			headers(jwt),
		);
		return res.data;
	}

	static async postCategoryUpdate(
		jwt: string,
		categoryId: number,
		cardIds: number,
	) {
		return await axios.post(
			`/api/categories/update`,
			{
				category_id: categoryId,
				card_ids: cardIds,
			},
			headers(jwt),
		);
	}

	static async postCategoryCreate(jwt: string, name: string) {
		return await axios.post(
			`/api/categories/create`,
			{ name, card_ids: [] },
			headers(jwt),
		);
	}

	static async postCategoryAddCard(
		jwt: string,
		engtext: string,
		rustext: string,
		image: FileList,
		catid?: number,
	) {
		return await axios.post(
			`/api/categories/add`,
			{
				engtext: engtext,
				rustext: rustext,
				image: image,
				catid: catid,
			},
			headers(jwt),
		);
	}

	static async postCategoryAddCardExist(
		jwt: string,
		cat_id: number,
		card_id: number,
	) {
		return await axios.post(
			`/api/categories/addExists`,
			{ cat_id, card_id },
			headers(jwt),
		);
	}

	static async deleteCategory(jwt: string, id: number) {
		return await axios.post(`/api/categories/delete`, { id }, headers(jwt));
	}

	static async deleteCategoryCard(
		jwt: string,
		categoryId: number,
		cardId: number,
	) {
		return await axios.delete(`/api/categories/delone`, {
			data: { category_id: categoryId, card_id: cardId },
			...headers(jwt),
		});
	}
}
