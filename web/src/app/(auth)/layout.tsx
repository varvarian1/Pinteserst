'use client';

import styles from './AuthLayout.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LayoutAuth = ({ children }: ILayout) => {
	const router = useRouter();
	const auth = useSelector((state: any) => state.auth.isAuth);

	useEffect(() => {
		if (auth) {
			router.push('/main');
			return;
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.container__wrapper}>
				<div className={styles.container__holder}>
					<Link className={styles.container__link} href="/">
						<Image
							className={styles.container__logo}
							alt="RestInPist logo"
							width={200}
							height={200}
							src="/img/logo-light.svg"
						/>
					</Link>
				</div>
				<div className={styles.container__center}>{children}</div>
			</div>
		</div>
	);
};

export default LayoutAuth;
