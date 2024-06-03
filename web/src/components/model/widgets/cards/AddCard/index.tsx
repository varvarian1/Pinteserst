import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import styles from './AddCard.module.scss';

interface AddCardProps {
	href?: string;
}

const AddCard = ({ href }: AddCardProps) => {
	return (
		href && (
			<Link href={href} className={styles.box}>
				<CirclePlus className={styles.image} strokeWidth={2} size="43px" />
			</Link>
		)
	);
};

AddCard.defaultProps = {
	href: undefined,
};

export default AddCard;
