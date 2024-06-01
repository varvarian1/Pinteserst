'use client';

import { CirclePlay, Pencil, SquareXIcon } from 'lucide-react';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import MainTitle from '@/components/model/ui/MainTitle';
import ConfirmDeleteModal from '@/components/model/widgets/ConfirmDeleteModal';
import { ICategoryCard } from './category-card.interface';
import styles from './CategoryCard.module.scss';
import useCategoryCard from '@/hooks/useCategoryCards';

const CategoryCard = ({ id, children }: ICategoryCard) => {
	const {
		data,
		deleteIsActive,
		setId,
		setOneCardModal,
		setNoCardModal,
		handleClickDelete,
		deleteCategoryHandle,
		setDeleteIsActive,
	} = useCategoryCard(id);

	const router = useRouter();

	return (
		<div className={styles.box}>
			<div className={styles['text-wrapper']}>
				<MainTitle size="extra-small" className={styles.title}>
					{children}
				</MainTitle>
			</div>
			<div className={styles.btns}>
				<SquareXIcon
					stroke="#FF5D5D"
					size="23px"
					strokeWidth={3}
					className={styles.btn}
					onClick={() => handleClickDelete()}
				/>
				<div
					className={cn(
						deleteIsActive
							? styles['confirm-modal']
							: styles['confirm-modal_off'],
					)}>
					<ConfirmDeleteModal
						active={deleteIsActive}
						onClose={() => {
							setDeleteIsActive(false);
						}}
						onDelete={() => {
							deleteCategoryHandle(id);
							setDeleteIsActive(false);
						}}
					/>
				</div>
				<Pencil
					stroke="var(--color-icons)"
					size="23px"
					strokeWidth={3}
					onClick={() => router.push(`/categories/edit-category/${id}`)}
					className={cn(styles.btn, styles['edit-button'])}
				/>
				<CirclePlay
					stroke="var(--color-icons)"
					size="23px"
					strokeWidth={3}
					className={cn(styles.btn, styles['play-button'])}
					onClick={() => {
						if (data !== undefined && data.length === 0) {
							setNoCardModal(true);
						} else if (data !== undefined && data.length === 1) {
							setOneCardModal(true);
							setId(id);
						} else {
							router.push(`/categories/${id}`);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default CategoryCard;
