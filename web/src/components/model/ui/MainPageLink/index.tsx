import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { IMainPageLink } from './main-page-link.interface';
import Title from '../MainTitle';
import styles from './MainPageLink.module.scss';

const MainPageLink = ({ children, href }: IMainPageLink) => {
	return (
		<Link href={href} className={styles.link}>
			<Title size="small" className={styles.text}>
				{children}
			</Title>
			<ChevronRight size={24} className={styles.icon} />
		</Link>
	);
};

export default MainPageLink;
