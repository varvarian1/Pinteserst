import Link from 'next/link';
import cn from 'clsx';
import Text from '../MainText';
import { ISidebarButton } from './sidebar-button.interface';
import styles from './SidebarButton.module.scss';

const SidebarButton = ({
	children,
	href = '',
	active = false,
	title,
	onClick,
	className = '',
}: ISidebarButton) => {
	const cls = cn(styles.button, active && styles.button__active, className);

	return (
		<Link href={href} className={cls} onClick={onClick}>
			<div className={styles['icon-container']}>{children}</div>
			<Text size="small" className={styles.title}>
				{title}
			</Text>
		</Link>
	);
};

export default SidebarButton;
