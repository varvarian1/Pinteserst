import cn from 'clsx';
import { IConfirmDeleteModel } from '@/components/model/widgets/ConfirmDeleteModal/confirm-delete-modal.interface';
import MainButton from '@/components/model/ui/MainButton';
import MainText from '@/components/model/ui/MainText';
import styles from './ConfirmDeleteModal.module.scss';

const ConfirmDeleteModal = ({
	active,
	onClose,
	onDelete,
}: IConfirmDeleteModel) => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<MainText size="small">Удалить?</MainText>
				<div className={styles.buttons}>
					<MainButton size="small" color="red" onClick={onDelete}>
						Да
					</MainButton>
					<MainButton size="small" color="gray" onClick={onClose}>
						Нет
					</MainButton>
				</div>
				<div className={styles.corner} />
			</div>
			<button
				className={cn(styles['container-delete'], active && styles.active)}
				type="button"
				aria-label="Button close"
				onClick={onClose}
			/>
		</div>
	);
};

export default ConfirmDeleteModal;
