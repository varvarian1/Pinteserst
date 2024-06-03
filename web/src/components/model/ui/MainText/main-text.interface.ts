import { ComponentSize } from '@/config/component-sizes.type';
import { FontWeight } from '@/config/font-weight.type';
import { TextColor } from '@/config/text-color.type';
import { ReactNode } from 'react';

export interface IMainText {
	children: ReactNode;
	size?: ComponentSize;
	type?: FontWeight;
	className?: string;
	color?: TextColor;
}
