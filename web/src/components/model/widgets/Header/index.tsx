import MainTitle from '../../ui/MainTitle';
import styles from './Header.module.scss';
import { IHeader } from './header.interface';

const Header = ({ children }: IHeader) => {
	return (
		<MainTitle size="middle" className={styles.header}>
			{children}
		</MainTitle>
	);
};

export default Header;
