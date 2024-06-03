'use client';

import cn from 'clsx';
import { ICardList } from './card-list.interface';
import styles from './CardList.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const AddCard = dynamic(
	() => import('@/components/model/widgets/cards/AddCard'),
);
const CategoryCard = dynamic(
	() => import('@/components/model/widgets/cards/CategoryCard'),
);
const InCategoryCard = dynamic(
	() => import('@/components/model/widgets/cards/InCategoryCard'),
);
const SpeakerCard = dynamic(
	() => import('@/components/model/widgets/cards/SpeakerCard'),
);
const TrainCard = dynamic(() => import('../cards/TrainCard'));
const MainTitle = dynamic(() => import('../../ui/MainTitle'));
const MainText = dynamic(() => import('../../ui/MainText'));

const CardList = ({
	type,
	categoryId,
	trains,
	cards,
	categories,
	href,
	plus = false,
}: ICardList) => {
	const path = usePathname();
	const router = useRouter();
	return (
		<div
			className={cn(
				styles.cards,
				cards &&
					cards.length === 0 &&
					(path === '/dictionary' || path === '/my-cards') &&
					styles['cards-empty'],
			)}>
			{categories
				? categories.map(item => (
						<CategoryCard id={item.id} key={item.id}>
							{item.name}
						</CategoryCard>
					))
				: trains
					? trains.map(item => (
							<TrainCard key={item.id} id={item.id}>
								{item.name}
							</TrainCard>
						))
					: cards && cards.length > 0
						? cards.map(item => {
								switch (type) {
									case 'speaker':
										if (item.inFavorites !== undefined)
											return (
												<SpeakerCard
													isInFavorite={item.inFavorites}
													id={item.id}
													key={item.id}
													translation={item.rustext}>
													{item.engtext}
												</SpeakerCard>
											);
										break;
									case 'incategory':
										if (categoryId !== undefined)
											return (
												<InCategoryCard
													id={item.id}
													categoryId={categoryId}
													key={item.id}
													translation={item.rustext}>
													{item.engtext}
												</InCategoryCard>
											);
										break;
									default:
										return null;
								}
								return null;
							})
						: (path === '/dictionary' || path === '/my-cards') && (
								<div className={styles['empty-message']}>
									<MainTitle className={styles.empty}>
										Пока что здесь ничего нет...
									</MainTitle>
									{path === '/my-cards' ? (
										<button
											onClick={() =>
												router.push('/categories/create-category')
											}>
											<MainText color="blue" type="regular" size="middle">
												Создать категорию
											</MainText>
										</button>
									) : (
										<button onClick={() => router.push('/categories')}>
											<MainText color="blue" type="regular" size="middle">
												Тренироваться
											</MainText>
										</button>
									)}
								</div>
							)}
			{path !== '/dictionary' &&
				path !== '/my-cards' &&
				(type === 'incategory' || type === 'category' || plus) && (
					<AddCard href={href} />
				)}
		</div>
	);
};

export default CardList;
