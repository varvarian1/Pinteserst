import useModalStore from '@/store/useModalStore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect } from 'react';
import useCardCarousel from './useCardCarousel';
import { ISwiperCard } from '@/components/model/widgets/Swiper/swiper.interface';

const useCtrlButtonsKeyboard = ({
	router,
	cards,
	onClickReload,
	onClickShuffle,
}: {
	cards: ISwiperCard[];
	router: AppRouterInstance;
	onClickReload?: () => void;
	onClickShuffle?: () => void;
}) => {
	const { setExitModal } = useModalStore(state => state);
	const { counter, translate, setCounter, setTranslate } =
		useCardCarousel(cards);

	const { isFinish } = useModalStore(state => state);

	useEffect(() => {
		const handelClickRight = (e: KeyboardEvent) => {
			if (!isFinish && (e.key === 'c' || e.key === 'с')) {
				setExitModal(true);
			} else if (!isFinish && (e.key === 'x' || e.key === 'ч')) {
				setTranslate(prev => prev - prev);
				setCounter(prev => prev - prev);
				onClickReload !== undefined && onClickReload();
			} else if (!isFinish && (e.key === 'z' || e.key === 'я')) {
				setTranslate(prev => prev - prev);
				setCounter(prev => prev - prev);
				onClickShuffle !== undefined && onClickShuffle();
			}
		};
		document.addEventListener('keydown', handelClickRight);

		return () => {
			document.removeEventListener('keydown', handelClickRight);
		};
	}, [router, onClickReload, onClickShuffle, counter, translate]);
};

export default useCtrlButtonsKeyboard;
