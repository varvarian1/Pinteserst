import MainButton from '@/components/ui/MainButton';
import styles from './NotFoundPage.module.scss';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div className={styles.main}>
			<h1 className={styles.main__error}>404</h1>
			<p className={styles.main__text}>
				This page you are looking for cannot be found!
			</p>
			<Link href="/">
				<MainButton type="button">Return main</MainButton>
			</Link>
		</div>
	);
};

export default NotFoundPage;
