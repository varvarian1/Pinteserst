import { ReactNode } from 'react';

export interface ITopCard {
	id: number;
	index: number;
	counter: number;
	children: ReactNode;
	img?: string;
	cardIsOpen: boolean;
	className?: string;
	onClickDone: () => void;
	openCard: () => void;
}
