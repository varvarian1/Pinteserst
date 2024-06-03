'use client';

import Image from 'next/image';
import MainButton from '@/components/model/ui/MainButton';
import Link from 'next/link';
import Title from '../components/model/ui/MainTitle';
import styles from './not-found.module.scss';

const LayoutSign = () => {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<Image src="/img/FullLogo.png" alt="Logo" width={212} height={60} />
				<div className={styles.center}>
					<Image
						src="/img/notFoundPage.png"
						alt="Not found"
						width={556}
						height={334}
					/>
					<Title className={styles['title-new']}>Страница не найдена 404</Title>
					<Link href="/home" className={styles['back-button']}>
						<MainButton size="large" color="gray">
							Венуться на главную
						</MainButton>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LayoutSign;
