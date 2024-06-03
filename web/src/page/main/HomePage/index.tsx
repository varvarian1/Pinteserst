'use client';

import useAuthStore from '@/store/useAuthStore';
import { useQuery } from 'react-query';
import SpeakerCard from '@/components/model/widgets/cards/SpeakerCard';
import CategoryCard from '@/components/model/widgets/cards/CategoryCard';
import MainCardList from '../../../components/model/widgets/TitledCardList';
import styles from './HomePage.module.scss';
import TrainCard from '@/components/model/widgets/cards/TrainCard';
import TrainService from '@/services/train.service';
import CardsService from '@/services/cards.service';
import CategoryService from '@/services/category.service';

const HomePage = () => {
	const jwt = useAuthStore(state => state.jwt);
	const trains = useQuery(['getTrainsMain', { jwt }], () =>
		TrainService.getTrain(jwt, 10),
	);
	const cards = useQuery(
		['getCardsMain', { jwt }],
		() => CardsService.getCards(jwt, 10),
		{
			keepPreviousData: false,
		},
	);
	const categories = useQuery(['getCategoriesMain', { jwt }], () =>
		CategoryService.getAllCategories(jwt, 10),
	);
	if (
		cards.data !== undefined &&
		categories.data !== undefined &&
		trains.data !== undefined
	)
		return (
			<div className={styles.home}>
				<MainCardList
					href="/categories/create-category"
					title="Категории"
					cards={categories.data?.map((el: { id: number; name: string }) => (
						<CategoryCard id={el.id} key={el.id}>
							{el.name}
						</CategoryCard>
					))}
					plus
					mainHref="/categories"
				/>
				<MainCardList
					href="/phrases"
					title="Разговорные фразы"
					cards={cards.data?.map(
						(el: {
							inFavorites: boolean;
							id: number;
							rustext: string;
							engtext: string;
						}) => (
							<SpeakerCard
								isInFavorite={el.inFavorites}
								id={el.id}
								translation={el.rustext}
								key={el.id}>
								{el.engtext}
							</SpeakerCard>
						),
					)}
					plus
					mainHref="/phrases"
				/>
				<MainCardList
					href="/training"
					title="Тренировки"
					cards={trains.data.map((el: { id: number; name: string }) => (
						<TrainCard id={el.id} key={el.id}>
							{el.name}
						</TrainCard>
					))}
					plus={false}
					mainHref="/training"
				/>
			</div>
		);
	return null;
};

export default HomePage;
