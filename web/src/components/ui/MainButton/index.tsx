import styles from './MainButton.module.scss';
import cn from 'clsx';
import IMainButton from './main-button.interface';

const MainButton = ({ className = '', onClick, children }: IMainButton) => {
	const cls = cn(className, styles.main);
	return (
		<button onClick={onClick} className={cls}>
			{children}
		</button>
	);
};

export default MainButton;
