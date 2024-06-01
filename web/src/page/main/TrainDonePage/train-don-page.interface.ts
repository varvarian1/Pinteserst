import { ISwiperCard } from '@/components/model/widgets/Swiper/swiper.interface';

export interface ITrainDonePage {
	learn: number;
	know: number;
	cards: ISwiperCard[];
	onClickReload: () => void;
	className: string;
}
