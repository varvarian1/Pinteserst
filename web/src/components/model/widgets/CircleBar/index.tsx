import MainText from '@/components/model/ui/MainText';
import { ICircleBar } from '@/components/model/widgets/CircleBar/circle-bar.interface';
import styles from './CircleBar.module.scss';

const ProgressBar = ({ level, progress }: ICircleBar) => {
	const calculateDashOffset = (progressBar: number) => {
		const circumference = 2 * Math.PI * 40;
		const offset = circumference - (progressBar / 100) * circumference;

		return offset;
	};

	return (
		<div className={styles.circle}>
			<div className={styles.text}>
				<MainText size="large">{level}</MainText>
				<MainText size="large" type="regular">
					lvl
				</MainText>
			</div>
			<svg>
				<circle className={styles.bg} cx="57" cy="57" r="45" />
				<circle
					className={styles.progress}
					cx="57"
					cy="57"
					r="45"
					style={{ strokeDashoffset: calculateDashOffset(progress) }}
				/>
			</svg>
		</div>
	);
};

export default ProgressBar;
