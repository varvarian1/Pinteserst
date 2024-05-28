import styles from './MainInput.module.scss';
import React from 'react';
import cn from 'clsx';
import IMainInput from './MainInput.interface';

const MainInput = ({ className, placeholder }: IMainInput) => {
	const cls = cn(className, styles.main);
	return <input placeholder={placeholder} className={styles.main} />;
};

export default MainInput;
