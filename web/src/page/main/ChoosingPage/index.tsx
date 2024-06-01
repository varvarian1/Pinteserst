'use client';

import MainButton from '@/components/model/ui/MainButton';
import MainTitle from '@/components/model/ui/MainTitle';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from 'react-query';
import useTitleStore from '@/store/useTitleStore';
import { useEffect } from 'react';
import styles from './ChoosingPage.module.scss';
import { useRouter } from 'next/navigation';
import CategoryService from '@/services/category.service';
import TrainService from '@/services/train.service';

const ChoosingPage = ({
	id,
	isTrain = false,
}: {
	id: number;
	isTrain?: boolean;
}) => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const setTitle = useTitleStore(state => state.setTitle);
	const getCat = useQuery(
		['getCategory', { jwt, id }],
		() => CategoryService.getCategory(jwt, id),
		{ enabled: false },
	);
	const getTrain = useQuery(
		['getTraining', { jwt, id }],
		() => TrainService.getTrain(jwt, id),
		{ enabled: false },
	);
	const router = useRouter();
	useEffect(() => {
		if (isTrain && getTrain.data === undefined) {
			getTrain.refetch();
		} else if (!isTrain && getCat.data === undefined) {
			getCat.refetch();
		}
		if (getCat.data !== undefined && !isTrain) setTitle(getCat.data);
		if (getTrain.data !== undefined && isTrain) setTitle(getTrain.data);
	}, [jwt, getCat.data]);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<MainTitle size="small">Лицевая сторона</MainTitle>
				<div className={styles.buttons}>
					<MainButton
						onClick={() => {
							sessionStorage.setItem('side', 'english');
							isTrain
								? router.push(`/swiper/train/${id}`)
								: router.push(`/swiper/${id}`);
						}}>
						Английский
					</MainButton>
					<MainButton
						onClick={() => {
							sessionStorage.setItem('side', 'russian');
							isTrain
								? router.push(`/swiper/train/${id}`)
								: router.push(`/swiper/${id}`);
						}}>
						Русский
					</MainButton>
				</div>
			</div>
		</div>
	);
};

export default ChoosingPage;
