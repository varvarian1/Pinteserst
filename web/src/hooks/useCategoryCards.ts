'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/useAuthStore';
import CategoryService from '@/services/category.service';
import useModalStore from '@/store/useModalStore';
import { isAxiosError } from 'axios';

const useCategoryCard = (id: number) => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const queryClient = useQueryClient();
	const { setId, setOneCardModal, setNoCardModal } = useModalStore(
		state => state,
	);
	const [deleteIsActive, setDeleteIsActive] = useState(false);

	const mutation = useMutation(
		(id: number) => CategoryService.deleteCategory(jwt, id),
		{
			onSuccess: () => {
				queryClient.refetchQueries('getCategoriesMain');
				queryClient.refetchQueries('getCategories');
			},
		},
	);

	const { data } = useQuery(['edit', { id, jwt }], () =>
		CategoryService.getCategoryCards(jwt, id),
	);

	const handleClickDelete = () => {
		setDeleteIsActive(!deleteIsActive);
	};

	const deleteCategoryHandle = async (id: number) => {
		try {
			const { status } = await mutation.mutateAsync(id);
			if (status !== 200) throw new Error();
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error(err.message);
			}
		}
	};

	return {
		data,
		deleteIsActive,
		setId,
		setOneCardModal,
		setNoCardModal,
		handleClickDelete,
		deleteCategoryHandle,
		setDeleteIsActive,
	};
};

export default useCategoryCard;
