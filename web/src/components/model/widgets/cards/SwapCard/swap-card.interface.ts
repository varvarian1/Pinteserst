import { ISwiperCard } from '../../Swiper/swiper.interface';

export interface ISwapCard {
	id: number;
	index: number;
	counter: number;
	english: string;
	translation: string;
	img: string;
	className: string;
	onClickDone: () => void;
}
