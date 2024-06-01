import { ReactNode } from 'react';

export interface ISpeakerCard {
	id: number;
	children: ReactNode;
	translation: string;
	isInFavorite: boolean;
}
