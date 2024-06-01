'use client';

import CategoryService from '@/services/category.service';
import UserService from '@/services/user.service';
import useAuthStore from '@/store/useAuthStore';
import { isAxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const useSpeakerCard = ({
	id,
	children,
	isInFavorite,
}: {
	id: number;
	children: ReactNode;
	isInFavorite: boolean;
}) => {
	const queryClient = useQueryClient();
	const [active, setActive] = useState<boolean>(isInFavorite);
	const [volumeActive, setVolumeActive] = useState(false);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const path = usePathname();

	const getDict = useMutation(async () => UserService.getDictCards(jwt));

	const delFromDict = useMutation(
		async (id: number) => UserService.removeFromDict(jwt, id),
		{
			onSuccess: () => {
				queryClient.refetchQueries('getDictCards');
			},
		},
	);

	const getPhrases = useMutation(async () =>
		CategoryService.getCategoryByName(jwt, 'Фразы'),
	);

	const delOne = useMutation(
		async ({ card_id, cat_id }: { card_id: number; cat_id: number }) =>
			CategoryService.deleteCategoryCard(jwt, cat_id, card_id),
		{
			onSuccess: () => {
				queryClient.refetchQueries('getCardsMain');
				queryClient.refetchQueries('getCategoriesMain');
				queryClient.refetchQueries('getCards');
				queryClient.refetchQueries('edit');
			},
		},
	);

	useEffect(() => {
		setActive(isInFavorite);
	}, [isInFavorite]);

	const addCardToCategory = useMutation(
		({ card_id, cat_id }: { card_id: number; cat_id: number }) =>
			CategoryService.postCategoryAddCardExist(jwt, cat_id, card_id),
		{
			onSuccess: () => {
				queryClient.refetchQueries('edit');
				queryClient.refetchQueries('getCategoriesMain');
				queryClient.refetchQueries('getCategories');
			},
		},
	);

	const createPhrasels = useMutation((name: string) =>
		CategoryService.postCategoryCreate(jwt, name),
	);

	useEffect(() => {
		if (getPhrases.data !== undefined && !active && path !== '/dictionary') {
			try {
				addCardToCategory.mutateAsync({
					card_id: id,
					cat_id: getPhrases.data,
				});
				setActive(true);
			} catch (error) {
				if (isAxiosError(error)) toast.error(error.message);
			}
		}

		if (active && getPhrases.data !== undefined && path !== '/dictionary') {
			try {
				delOne.mutateAsync({
					card_id: id,
					cat_id: getPhrases.data,
				});
				setActive(false);
			} catch (error) {
				if (isAxiosError(error)) toast.error(error.message);
			}
		}
	}, [getPhrases.data]);

	useEffect(() => {
		if (path === '/dictionary' && active) {
			try {
				delFromDict.mutateAsync(id);
				setActive(false);
			} catch (error) {
				if (isAxiosError(error)) toast.error(error.message);
			}
		}
	}, [getDict.data, active]);

	async function handleClickPlus() {
		try {
			if (path === '/dictionary') {
				delFromDict.mutateAsync(id);
				setActive(false);
			}
			await getPhrases.mutateAsync();
			await getDict.mutateAsync();
		} catch {
			await createPhrasels.mutateAsync('Фразы');
			handleClickPlus();
		}
	}

	function handleClickVolume() {
		if (!volumeActive && window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance();
			utterance.onstart = () => setVolumeActive(true);
			if (/^[а-яА-Я]+$/.test(String(children))) {
				utterance.lang = 'ru';
				utterance.rate = 0.7;
				utterance.pitch = 0.5;
			} else {
				utterance.lang = 'en';
				utterance.rate = 0.7;
				utterance.pitch = 0.5;
			}
			utterance.text = String(children);
			utterance.onend = () => setVolumeActive(false);
			window.speechSynthesis.speak(utterance);
		} else {
			console.log('Браузер не поддерживает');
		}
	}

	return {
		active,
		volumeActive,
		setVolumeActive,
		handleClickVolume,
		handleClickPlus,
		setActive,
	};
};

export default useSpeakerCard;
