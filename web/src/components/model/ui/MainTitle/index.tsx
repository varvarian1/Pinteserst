import cn from 'clsx';
import { IMainTitle } from './main-title.interface';
import styles from './MainTitle.module.scss';

const MainTitle = ({
	children,
	size = 'small',
	className = '',
}: IMainTitle) => {
	const cls = cn(styles.title, styles[`title__${size}`], className);

	return <h2 className={cls}>{children}</h2>;
};

export default MainTitle;
