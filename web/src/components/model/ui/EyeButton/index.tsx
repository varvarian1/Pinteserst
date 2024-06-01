import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import styles from './EyeButton.module.scss';

const EyeButton = () => {
	const [eyeIsOpen, setEyeIsOpen] = useState(false);

	return eyeIsOpen ? (
		<EyeIcon
			className={styles['open-eye-icon']}
			onClick={() => {
				setEyeIsOpen(false);
			}}
		/>
	) : (
		<EyeOff
			className={styles['off-eye-icon']}
			onClick={() => {
				setEyeIsOpen(true);
			}}
		/>
	);
};

export default EyeButton;
