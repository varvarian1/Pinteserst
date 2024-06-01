import cn from 'clsx';
import { IMainButton } from './main-button.interface';
import styles from './MainButton.module.scss';

const MainButton = ({
	children,
	color = 'blue',
	size = 'middle',
	className = '',
	...props
}: IMainButton) => {
	const cls = cn(
		styles.button,
		size && styles[`button__${size}`],
		color && styles[`button__${color}`],
		className,
	);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<button type="button" aria-label="Main button" className={cls} {...props}>
			{children}
		</button>
	);
};

export default MainButton;
