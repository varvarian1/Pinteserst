import Link from 'next/link';
import styles from './OthersCard.module.scss';

const OthersCard = ({ href }: { href: string }) => {
	return (
		<Link href={href} className={styles.box}>
			...
		</Link>
	);
};

export default OthersCard;
