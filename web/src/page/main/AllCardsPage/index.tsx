'use client';

import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import CardsService from '@/services/cards.service';
import useTitleStore from '@/store/useTitleStore';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const CardList = dynamic(() => import('@/components/model/widgets/CardList'));

export interface ICardInterface {
	id: number;
	engtext: string;
	rustext: string;
	inFavorites?: boolean;
}

const AllCardsPage = () => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { setTitle } = useTitleStore(({ setTitle }) => ({ setTitle }));
	const query = useQuery(['getAuthorCards', { jwt }], () =>
		CardsService.getOwnCards(jwt),
	);
	useEffect(() => setTitle('Мои карточки'), []);
	return (
		<CardList type="speaker" cards={query.data} href="/create-card" plus />
	);
};

export default AllCardsPage;
