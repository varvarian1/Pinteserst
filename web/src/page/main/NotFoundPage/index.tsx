import MainButton from '@/components/ui/MainButton';
import styles from './NotFoundPage.module.scss';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div className={styles.main}>
			<div className={styles.main__error}>Error 404!</div>
			<div className={styles.main__text}>Not found!</div>
			<Link href="/">
				<MainButton>Back</MainButton>
			</Link>
		</div>
	);
};

export default NotFoundPage;
