import { ReactNode } from 'react';

export interface IBottomCard {
	children: ReactNode;
	className?: string;
	closeCard: () => void;
}
