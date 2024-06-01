import styles from './MainInput.module.scss';
import cn from 'clsx';
import IMainInput from './MainInput.interface';
import { forwardRef } from 'react';

const MainInput = forwardRef<HTMLInputElement, IMainInput>(
	({ className = '', type, placeholder, ...props }, ref) => {
		const cls = cn(styles.main, className);

		return (
			<input
				className={cls}
				placeholder={placeholder}
				type={type}
				ref={ref}
				{...props}
			/>
		);
	},
);

MainInput.displayName = 'MainInput';

export default MainInput;
