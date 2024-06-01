'use client';

import { Pencil, SquareXIcon } from 'lucide-react';
import MainTitle from '@/components/model/ui/MainTitle';
import MainText from '@/components/model/ui/MainText';
import styles from './InCategoryCard.module.scss';
import { IIncategoryCard } from './in-category-card.interface';
import cn from 'clsx';
import ConfirmDeleteModal from '../../ConfirmDeleteModal';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import useIncategoryCard from '@/hooks/useIncategoryCard';

const InCategoryCard = ({
	id,
	categoryId,
	children,
	translation,
}: IIncategoryCard) => {
	const router = useRouter();
	const { deleteIsActive, mutation, setDeleteIsActive, handleClickDelete } =
		useIncategoryCard();

	async function deleteCardHandle(category_id: number, card_id: number) {
		try {
			const { status } = await mutation.mutateAsync({ category_id, card_id });
			if (status === 200) throw Error;
		} catch (err) {
			if (isAxiosError(err)) {
				toast.error(err.message);
			}
		}
	}

	return (
		<div className={styles.box}>
			<div className={styles['text-wrapper']}>
				<MainTitle size="extra-small">{children}</MainTitle>
				<MainText type="bold" size="middle" color="gray">
					{translation}
				</MainText>
			</div>
			<div className={styles.list}>
				<SquareXIcon
					stroke="#FF5D5D"
					size={23}
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
							deleteCardHandle(categoryId, id);
							setDeleteIsActive(false);
						}}
					/>
				</div>
				<Pencil
					stroke="var(--color-icons)"
					size={23}
					strokeWidth={3}
					className={cn(styles.btn, styles['edit-button'])}
					onClick={() => router.push(`/categories/edit-incategory/${id}`)}
				/>
			</div>
		</div>
	);
};

export default InCategoryCard;
