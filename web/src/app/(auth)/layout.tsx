import styles from './AuthLayout.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const LayoutAuth = ({ children }: ILayout) => {
	return (
		<div className={styles.container}>
			<div className={styles.container__wrapper}>
				<Link className={styles.container__link} href="/">
					<Image
						className={styles.container__logo}
						alt="RestInPist logo"
						width={200}
						height={200}
						src="/img/logo-light.svg"
					/>
				</Link>
				<div className={styles.container__center}>{children}</div>
			</div>
		</div>
	);
};

export default LayoutAuth;
