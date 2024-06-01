import { EyeIcon } from 'lucide-react';
import cn from 'clsx';
import MainTitle from '@/components/model/ui/MainTitle';
import styles from './BottomCard.module.scss';
import { IBottomCard } from './bottom-card.interface';

const BottomCard = ({ children, className, closeCard }: IBottomCard) => {
	return (
		<div className={cn(styles.box, className)}>
			<div className={styles['text-wrapper']}>
				<MainTitle size="extra-small">{children}</MainTitle>
			</div>
			<EyeIcon
				size="23px"
				strokeWidth={3}
				onClick={closeCard}
				className={styles.eye}
			/>
		</div>
	);
};

export default BottomCard;
