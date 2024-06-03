'use client';

import CardList from '@/components/model/widgets/CardList';
import { isAxiosError } from 'axios';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from 'react-query';
import styles from './PhrasesPage.module.scss';
import CardsService from '@/services/cards.service';

const PhrasesPage = () => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { data, error, refetch } = useQuery(
		['getCards', jwt],
		() => CardsService.getCards(jwt),
		{
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	);
	if (isAxiosError(error)) {
		setTimeout(() => refetch(), 1000);
		return null;
	}
	return (
		<div className={styles.phrases}>
			<CardList type="speaker" cards={data} href="/create-card" />
		</div>
	);
};

export default PhrasesPage;
