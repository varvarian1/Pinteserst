import styles from './AuthLayout.module.scss';
import Image from 'next/image';

const LayoutAuth = ({ children }: ILayout) => {
	return (
		<div className={styles.auth}>
			<Image
				className={styles.auth__image}
				alt="RestInPist logo"
				width={200}
				height={200}
				src="/img/logo-light.svg"
			/>
			<div className={styles.auth__center}>{children}</div>
		</div>
	);
};

export default LayoutAuth;
