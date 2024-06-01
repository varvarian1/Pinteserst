'use client';

import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import useTitleStore from '@/store/useTitleStore';
import UserService from '@/services/user.service';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const CardList = dynamic(() => import('@/components/model/widgets/CardList'));

export interface ICardInterface {
	id: number;
	engtext: string;
	rustext: string;
	inFavorites?: boolean;
}

const MyDictionaryPage = () => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { setTitle } = useTitleStore(({ setTitle }) => ({ setTitle }));
	const { data } = useQuery(['getDictCards', { jwt }], () =>
		UserService.getDictCards(jwt),
	);

	useEffect(() => setTitle('Мой словарь'), []);

	return <CardList type="speaker" cards={data} href="/dictionary" plus />;
};

export default MyDictionaryPage;
