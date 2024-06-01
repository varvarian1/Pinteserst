'use client';

import CategoryService from '@/services/category.service';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const useIncategoryCard = () => {
	const [deleteIsActive, setDeleteIsActive] = useState(false);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const queryClient = useQueryClient();
	const mutation = useMutation(
		({ category_id, card_id }: { category_id: number; card_id: number }) =>
			CategoryService.deleteCategoryCard(jwt, category_id, card_id),
		{
			onSuccess() {
				queryClient.refetchQueries();
			},
		},
	);

	function handleClickDelete() {
		setDeleteIsActive(!deleteIsActive);
	}

	return {
		deleteIsActive,
		mutation,
		setDeleteIsActive,
		handleClickDelete,
	};
};

export default useIncategoryCard;
