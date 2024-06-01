import { ReactNode } from 'react';

interface ITitledCardList {
	title: string;
	cards: ReactNode[];
	href: string;
	mainHref: string;
	plus: boolean;
}

export default ITitledCardList;
