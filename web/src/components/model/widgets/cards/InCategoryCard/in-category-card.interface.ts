import { ReactNode } from 'react';

export interface IIncategoryCard {
	id: number;
	categoryId: number;
	children: ReactNode;
	translation: string;
}
