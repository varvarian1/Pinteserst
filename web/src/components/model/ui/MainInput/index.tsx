'use client';

import cn from 'clsx';
import { forwardRef, useState } from 'react';
import Eye from '../EyeButton';
import styles from './MainInput.module.scss';
import { IMainInput } from './main-input.interface';

const MainInput = forwardRef<HTMLInputElement, IMainInput>(
	({ type, placeholder, className = '', ...props }, ref) => {
		const [inputType, setInputType] = useState(type);
		const [isText, setIsText] = useState(false);
		const cls = cn(styles.input, className);

		return (
			<div className={styles['input-container']}>
				<input
					type={inputType}
					className={cls}
					placeholder={placeholder}
					ref={ref}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}
				/>
				{type === 'password' && (
					<button
						type="button"
						aria-label="Password eye"
						onClick={() => {
							setIsText(!isText);
							setInputType(isText ? 'password' : 'text');
						}}>
						<Eye />
					</button>
				)}
			</div>
		);
	},
);

MainInput.displayName = 'MainInput';
export default MainInput;
