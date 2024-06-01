import cn from 'clsx';
import { IMainText } from './main-text.interface';
import styles from './MainText.module.scss';

const MainText = ({
	children,
	size = 'small',
	type = 'bold',
	color = 'black',
	className = '',
}: IMainText) => {
	const cls = cn(
		styles.text,
		size && styles[`text__${size}`],
		type && styles[`text__${type}`],
		color && styles[`text__${color}`],
		className,
	);

	return <div className={cls}>{children}</div>;
};

export default MainText;
