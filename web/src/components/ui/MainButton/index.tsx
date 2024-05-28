import styles from './MainButton.module.scss';
import cn from 'clsx';
import IMainButton from './main-button.interface';

const MainButton = ({ className = '', children }: IMainButton) => {
	const cls = cn(className, styles.main);
	return <button className={cls}>{children}</button>;
};

export default MainButton;
