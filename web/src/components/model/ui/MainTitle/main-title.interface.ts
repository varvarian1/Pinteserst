import { ComponentSize } from '@/config/component-sizes.type';
import { ReactNode } from 'react';

export interface IMainTitle {
	children: ReactNode;
	size?: ComponentSize;
	className?: string;
}
