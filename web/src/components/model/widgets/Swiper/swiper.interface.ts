export interface ISwiperCard {
	id: number;
	engtext: string;
	rustext: string;
	image: string;
}

export interface ISwiper {
	cards: ISwiperCard[];
}
