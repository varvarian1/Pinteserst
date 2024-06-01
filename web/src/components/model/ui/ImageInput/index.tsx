'use client';

import React, { forwardRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import styles from './ImageInput.module.scss';
import { IImageInput } from './image-input.interface';
import Text from '../MainText';
import cn from 'clsx';

const ImageInput = forwardRef<HTMLInputElement, IImageInput>(
	({ imageUrl, className = '', ...props }, ref) => {
		const [isDragOver, setIsDragOver] = useState(false);
		const cls = cn(styles.wrapper, isDragOver && styles.dragging);

		return (
			<div
				className={cls}
				onDragOver={() => setIsDragOver(true)}
				onDragLeave={() => setIsDragOver(false)}
				onDrop={() => {
					setIsDragOver(false);
				}}>
				<div className={styles.container}>
					{imageUrl ? (
						<div className={styles['image-holder']}>
							<Image
								className={styles['image-photo']}
								src={imageUrl}
								quality={50}
								placeholder="empty"
								width={500}
								height={300}
								alt="Uploaded"
							/>
						</div>
					) : (
						<div className={styles.icon}>
							<ImagePlus size={50} className={styles['image-plus']} />
							<Text className={styles['image-text']}>
								Добавьте изображение...
							</Text>
						</div>
					)}
					<input
						type="file"
						ref={ref}
						className={styles['image-input']}
						{...props}
					/>
				</div>
			</div>
		);
	},
);

ImageInput.displayName = 'ImageInput';
export default ImageInput;
