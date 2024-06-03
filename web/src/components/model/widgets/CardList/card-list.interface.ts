import { CardTypes } from '@/config/card-types.type';

export interface ICardInterface {
	id: number;
	engtext: string;
	rustext: string;
	inFavorites?: boolean;
}

export interface ICategoryInterface {
	id: number;
	name: string;
}

export interface ITrainInterface {
	id: number;
	name: string;
}

export interface ICardList {
	type: CardTypes;
	href: string;
	categoryId?: number;
	cards?: ICardInterface[];
	categories?: ICategoryInterface[];
	trains?: ITrainInterface[];
	plus?: boolean;
}
