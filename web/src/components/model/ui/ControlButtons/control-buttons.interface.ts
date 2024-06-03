import { ISwiperCard } from '../../widgets/Swiper/swiper.interface';

export interface IControlButtons {
	onClickShuffle?: () => void;
	onClickReload?: () => void;
	onClickExit?: () => void;
	className?: string;
	cards: ISwiperCard[];
}
