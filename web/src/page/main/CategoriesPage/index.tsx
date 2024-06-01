'use client';

import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import CardList from '@/components/model/widgets/CardList';
import CategoryService from '@/services/category.service';

const CategoriesPage = () => {
	const { jwt: authToken } = useAuthStore(({ jwt }) => ({ jwt }));
	const { data, refetch } = useQuery(
		['getCategories', authToken],
		() => CategoryService.getAllCategories(authToken),
		{
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await refetch();
			} catch (err) {
				console.error('Error while refetching:', err);
			}
		};

		fetchData();
	}, []);

	return (
		<CardList
			type="category"
			categories={data}
			href="/categories/create-category"
		/>
	);
};

export default CategoriesPage;
