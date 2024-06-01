'use client';

import cn from 'clsx';
import BottomCard from '../BottomCard';
import TopCard from '../TopCard';
import { ISwapCard } from './swap-card.interface';
import styles from './SwapCard.module.scss';
import useSwapCard from '@/hooks/useSwapCard';

const SwapCard = ({
	id,
	index,
	counter,
	english,
	translation,
	img,
	className,
	onClickDone,
}: ISwapCard) => {
	const { isOpen, setIsOpen } = useSwapCard();

	return (
		<div className={cn(styles['swap-card'], className)}>
			<TopCard
				id={id}
				index={index}
				counter={counter}
				onClickDone={onClickDone}
				img={img}
				cardIsOpen={isOpen}
				openCard={() => setIsOpen(true)}
				className={cn(!isOpen ? styles['top-card'] : styles['top-card_open'])}>
				{sessionStorage.getItem('side') === 'english' ? english : translation}
			</TopCard>
			<div>
				<BottomCard
					closeCard={() => setIsOpen(false)}
					className={styles['bottom-card']}>
					{sessionStorage.getItem('side') === 'russian' ? english : translation}
				</BottomCard>
			</div>
		</div>
	);
};

export default SwapCard;
