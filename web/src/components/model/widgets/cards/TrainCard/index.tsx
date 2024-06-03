'use client';

import { CirclePlay } from 'lucide-react';
import cn from 'clsx';
import MainTitle from '@/components/model/ui/MainTitle';
import styles from './TrainCard.module.scss';
import { ITrainCard } from './traincard.interface';
import { useRouter } from 'next/navigation';
import useTitleStore from '@/store/useTitleStore';

const TrainCard = ({ children, id, className }: ITrainCard) => {
	const router = useRouter();
	const { setTitle } = useTitleStore(state => state);
	return (
		<div className={cn(styles.box, className)}>
			<div className={styles['text-wrapper']}>
				<MainTitle size="extra-small">{children}</MainTitle>
			</div>
			<CirclePlay
				size={30}
				strokeWidth={3}
				onClick={() => {
					router.push(`/training/${id}`);
					setTitle(children?.toString());
				}}
				stroke="var(--color-icons)"
				className={styles.play}
			/>
		</div>
	);
};

export default TrainCard;
