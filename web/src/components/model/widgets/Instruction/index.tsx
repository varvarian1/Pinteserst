import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Space,
} from 'lucide-react';
import MainTitle from '../../ui/MainTitle';
import styles from './Instruction.module.scss';
import cn from 'clsx';
import MainText from '../../ui/MainText';
import { useEffect, useState, CSSProperties } from 'react';
import useTutorStore from '@/store/useTutorStore';

const Instruction = ({ className }: { className: string }) => {
	const [opacity, setOpacity] = useState(false);
	const { show } = useTutorStore(({ show }) => ({ show }));
	const { setShow } = useTutorStore(({ setShow }) => ({ setShow }));
	useEffect(() => {
		setTimeout(() => {
			setOpacity(true);
		}, 5000);
	}, []);
	const styled: CSSProperties = {
		display: show ? 'block' : 'none',
	};
	return (
		<div
			className={cn(
				styles.container,
				opacity && styles.container__opacity,
				className,
			)}
			style={styled}>
			<MainTitle className={styles.title}>Управление</MainTitle>
			<div className={styles.instructions}>
				<div className={styles['left-instruction']}>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<ChevronUp stroke="#4a4a4a" size={20} strokeWidth={3} />
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Открыть перевод
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<ChevronDown stroke="#4a4a4a" size={20} strokeWidth={3} />
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Закрыть перевод
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<ChevronRight stroke="#4a4a4a" size={20} strokeWidth={3} />
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Следующая карточка
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<ChevronLeft stroke="#4a4a4a" size={20} strokeWidth={3} />
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Предыдущая карточка
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<MainTitle size="extra-small" className={styles['icon-letter']}>
								z
							</MainTitle>
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Перемешать
						</MainText>
					</div>
				</div>
				<div className={styles['right-instruction']}>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<MainTitle size="extra-small" className={styles['icon-letter']}>
								x
							</MainTitle>
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Начать заново
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<MainTitle size="extra-small" className={styles['icon-letter']}>
								c
							</MainTitle>
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Выйти
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<MainTitle size="extra-small" className={styles['icon-letter']}>
								v
							</MainTitle>
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Воспроизвести звук
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<MainTitle size="extra-small" className={styles['icon-letter']}>
								b
							</MainTitle>
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Выучил слово
						</MainText>
					</div>
					<div className={styles.instruction}>
						<div className={styles.icon}>
							<Space stroke="#4a4a4a" size={20} strokeWidth={3} />
						</div>
						<MainText size="large" className={styles['instruction-title']}>
							Показать картинку
						</MainText>
					</div>
				</div>
			</div>
			<button onClick={() => setShow(false)}>
				<MainText className={styles['dont-show']}>
					Больше не показывать
				</MainText>
			</button>
		</div>
	);
};

export default Instruction;
