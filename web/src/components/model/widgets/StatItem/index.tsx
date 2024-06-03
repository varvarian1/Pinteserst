import { ReactNode } from 'react';
import MainTitle from '../../ui/MainTitle';
import styles from './StatItem.module.scss';

const StatItem = ({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) => {
	return (
		<div className={styles['stat-item']}>
			<MainTitle size="extra-small" className={styles.title}>
				{title}
			</MainTitle>
			<div className={styles.number}>{children}</div>
		</div>
	);
};

export default StatItem;
