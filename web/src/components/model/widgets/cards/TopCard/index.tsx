'use client';

import { EyeOff, SquareCheckBig, Volume2 } from 'lucide-react';
import cn from 'clsx';
import Image from 'next/image';
import styles from './TopCard.module.scss';
import { ITopCard } from './top-card.interface';
import MainTitle from '@/components/model/ui/MainTitle';
import useTopCard from '@/hooks/useTopCard';

const TopCard = ({
	id,
	index,
	counter,
	children,
	img,
	cardIsOpen,
	onClickDone,
	openCard,
	className,
}: ITopCard) => {
	const {
		active,
		imageIsOpen,
		volumeActive,
		setActive,
		handleClickVolume,
		handleClickDone,
		setImageIsOpen,
	} = useTopCard({
		id,
		img,
		index,
		counter,
		children,
		cardIsOpen,
		onClickDone,
	});

	return (
		<div className={cn(styles.wrapper, className)}>
			<div
				className={cn(styles.card, imageIsOpen && styles['card__image-open'])}>
				<Volume2
					stroke="var(--color-icons)"
					size={23}
					strokeWidth={3}
					className={cn(
						styles['volume-icon'],
						volumeActive && styles['volume-icon_blue'],
					)}
					onClick={() => handleClickVolume()}
				/>
				<SquareCheckBig
					stroke={!active ? 'var(--color-icons)' : '#5EB84F'}
					size={23}
					strokeWidth={3}
					className={styles['square-plus-icon']}
					onClick={() => {
						handleClickDone(id);
						onClickDone();
						setActive(!active);
					}}
				/>
				<div className={styles.content}>
					<div className={styles['text-wrapper']}>
						<MainTitle size="extra-small" className={styles.word}>
							{children}
						</MainTitle>
					</div>
					<EyeOff
						stroke="var(--color-icons)"
						size={23}
						strokeWidth={3}
						onClick={openCard}
						className={styles.eye}
					/>
				</div>
				<button
					className={cn(img ? styles.arrow : styles.arrow_off)}
					onClick={() => img && setImageIsOpen(!imageIsOpen)}
					type="button"
					aria-label="Toggle image">
					<div
						className={cn(
							!imageIsOpen ? styles['left-line'] : styles['left-line-top'],
						)}
					/>
					<div
						className={cn(
							!imageIsOpen ? styles['right-line'] : styles['right-line-top'],
						)}
					/>
				</button>
			</div>
			<div
				className={cn(
					styles['image-wrapper'],
					imageIsOpen && styles['image-wrapper-open'],
				)}>
				<div className={styles['outside-container']}>
					<div className={styles['image-container']}>
						{img && (
							<Image
								src={`data:image/png;base64,${img}`}
								alt="img"
								width={242}
								height={100}
								quality={100}
								className={styles.image}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopCard;
