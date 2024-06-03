'use client';

import cn from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Swiper.module.scss';
import { ISwiper } from './swiper.interface';
import ControlButtons from '../../ui/ControlButtons';
import useModalStore from '@/store/useModalStore';
import MainModalWindow from '../MainModalWindow';
import useCardCarousel from '@/hooks/useCardCarousel';
import Instruction from '../Instruction';
import TrainDonePage from '@/page/main/TrainDonePage';
import useTrainStore from '@/store/useTrainStore';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const SwapCard = dynamic(() => import('../cards/SwapCard'));

const Swiper = ({ cards }: ISwiper) => {
	const { exitModal, setExitModal } = useModalStore(state => state);
	const {
		progress,
		translateCompleted,
		translate,
		counter,
		setTranslate,
		setCounter,
		handleClickArrow,
		handleClickShuffle,
	} = useCardCarousel(cards);
	const { learned, learning } = useTrainStore(({ learned, learning }) => ({
		learned,
		learning,
	}));

	const memoizedCards = useMemo(() => cards, [cards]);

	return (
		<div>
			<div
				className={cn(
					styles.wrapper,
					counter === memoizedCards.length && styles.none,
				)}>
				<div className={styles['progress-bar']}>
					<div className={styles['blue-line']} style={{ width: progress }} />
					<div className={styles['gray-line']} />
				</div>
				<button
					className={styles['chevron-left']}
					onClick={() => handleClickArrow(true, false)}
					type="button"
					aria-label="Previous">
					<ChevronLeft size={40} stroke="var(--color-icons)" />
				</button>
				<ul className={styles.swiper}>
					<div className={styles['left-shadow']} />
					<div
						className={styles['swiper-container']}
						style={{ transform: `translateX(${translate}px)` }}>
						{cards.map((item, index) => (
							<SwapCard
								id={item.id}
								index={index}
								counter={cards.length - 1 - counter}
								onClickDone={() => {
									setTranslate(prev => prev + 756);
									setCounter(prev => prev + 1);
								}}
								key={item.id}
								english={item.engtext}
								translation={item.rustext}
								img={item.image}
								className={cn(
									styles.card,
									!translateCompleted &&
										index === cards.length - counter &&
										styles.card__animate,
								)}
							/>
						))}
					</div>
					<div className={styles['right-shadow']} />
				</ul>
				<button
					className={styles['chevron-right']}
					onClick={() => {
						handleClickArrow(false, true);
					}}
					type="button"
					aria-label="Next">
					<ChevronRight size={40} stroke="var(--color-icons)" />
				</button>
				<ControlButtons
					cards={cards}
					onClickShuffle={() => {
						setTranslate(prev => prev - prev);
						setCounter(prev => prev - prev);
						handleClickShuffle();
					}}
					onClickReload={() => {
						setTranslate(prev => prev - prev);
						setCounter(prev => prev - prev);
					}}
					onClickExit={() => setExitModal(true)}
					className={styles['control-buttons']}
				/>
				<MainModalWindow
					theme="primary"
					onClose={() => {
						setExitModal(false);
					}}
					className={cn(
						exitModal ? styles['confirm-modal'] : styles['confirm-modal_off'],
					)}>
					Вы уверены что хотите выйти?
				</MainModalWindow>
				{window.innerWidth > 1300 && (
					<Instruction className={styles.instruction} />
				)}
			</div>
			{counter === cards.length && (
				<TrainDonePage
					onClickReload={() => {
						setTranslate(prev => prev - prev);
						setCounter(prev => prev - prev);
					}}
					cards={cards}
					learn={learning}
					know={learned}
					className={styles.done}
				/>
			)}
		</div>
	);
};

export default Swiper;
