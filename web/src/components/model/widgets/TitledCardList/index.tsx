'use client';

import AddCard from '@/components/model/widgets/cards/AddCard';
import OthersCard from '@/components/model/widgets/cards/OthersCard';
import styles from './titled-card-list.module.scss';
import ITitledCardList from './titled-card-list.interface';
import MainPageLink from '../../ui/MainPageLink';
import useTitledCardList from '@/hooks/useTitledCardList';

const TitledCardList = ({
	title,
	cards,
	href,
	mainHref,
	plus,
}: ITitledCardList) => {
	const { numOfCards, ulRef, ulWidth } = useTitledCardList();

	return (
		<div className={styles['main-card-list']}>
			<MainPageLink href={mainHref}>{title}</MainPageLink>
			<ul ref={ulRef} className={styles.ul}>
				{cards.filter((_, index) => index <= numOfCards)}
				{ulWidth / 256 < cards.length + 1 ? (
					<OthersCard href={href} />
				) : plus ? (
					<AddCard href={href} />
				) : (
					<></>
				)}
			</ul>
		</div>
	);
};

export default TitledCardList;
