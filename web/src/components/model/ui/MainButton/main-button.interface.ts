import { ComponentSize } from '@/config/component-sizes.type';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IMainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	color?: string;
	size?: ComponentSize;
	className?: string;
}
