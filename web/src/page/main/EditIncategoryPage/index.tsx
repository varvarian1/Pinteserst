'use client';

import { toast, ToastContainer } from 'react-toastify';
import MainTitle from '@/components/model/ui/MainTitle';
import MainInput from '@/components/model/ui/MainInput';
import ImageInput from '@/components/model/ui/ImageInput';
import MainButton from '@/components/model/ui/MainButton';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useAuthStore from '@/store/useAuthStore';
import { useMutation, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import useTitleStore from '@/store/useTitleStore';
import styles from './EditIncategory.module.scss';
import CardsService from '@/services/cards.service';
import 'react-toastify/dist/ReactToastify.css';
import { ImageMinus } from 'lucide-react';
import MainText from '@/components/model/ui/MainText';

interface ICardForm {
	id: number;
	engtext: string;
	rustext: string;
	image?: FileList | string | null;
}

const EditIncategoryPage = ({ id }: { id: number }) => {
	const [imageUrl, setImageUrl] = useState('');
	const router = useRouter();
	const { setTitle } = useTitleStore(state => state);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { register, handleSubmit, setValue } = useForm<ICardForm>();
	const card = useQuery(['getCard', { jwt, id }], () =>
		CardsService.getCard(jwt, id),
	);
	const styled: React.CSSProperties = {
		display: imageUrl === '' ? 'none' : '',
	};
	const mutation = useMutation((data: ICardForm) =>
		CardsService.postCardUpdate(
			jwt,
			data.id,
			data.engtext,
			data.rustext,
			data.image,
		),
	);

	const handleImageChange = (file: File) => {
		if (file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const { result } = reader;
				if (typeof result === 'string') {
					setImageUrl(result);
				}
			};
		}
		document.getElementById('submit')?.focus();
	};

	useEffect(() => {
		setTitle('Редактирование карточки');
		setValue('image', undefined);
		document.getElementById('submit')?.focus();
	}, []);

	useEffect(() => {
		if (card.data !== undefined) {
			setValue('id', card.data.id);
			setValue('engtext', card.data.engtext);
			setValue('rustext', card.data.rustext);
			if (card.data.image)
				setImageUrl(`data:image/png;base64,${card.data.image}`);
		}
	}, [card.data]);

	async function onSubmit(data: ICardForm) {
		try {
			await mutation.mutateAsync(data);
			router.back();
		} catch {
			toast.warning('Ошибка');
		}
	}

	return (
		<form className={styles['edit-form']} onSubmit={handleSubmit(onSubmit)}>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<MainTitle>Редактирование</MainTitle>
			<MainInput
				type="text"
				placeholder="Английское слово"
				{...register('engtext')}
			/>
			<MainInput
				type="text"
				placeholder="Русское слово"
				{...register('rustext')}
			/>
			<div className={styles['cancel-image-box']}>
				<button
					style={styled}
					className={styles['cancel-image']}
					onClick={() => {
						setImageUrl('');
						setValue('image', undefined);
					}}
					type="button">
					<ImageMinus
						size={50}
						strokeWidth={2}
						className={styles['cancel-ico']}
					/>
					<MainText className={styles['cancel-text']}>
						Удалить изображение
					</MainText>
				</button>
				<ImageInput
					imageUrl={imageUrl}
					tabIndex={-1}
					{...register('image', {
						onChange: e => {
							const { files } = e.target;
							if (files && files.length > 0) {
								const file = files[files.length - 1];
								handleImageChange(file);
								setValue('image', file);
							}
							e.target.blur();
						},
					})}
				/>
			</div>
			<div className={styles.buttons}>
				<MainButton color="gray" type="button" onClick={() => router.back()}>
					Отмена
				</MainButton>
				{/* eslint-disable-next-line jsx-a11y/tabindex-no-positive */}
				<MainButton type="submit" id="submit" tabIndex={1}>
					Редактировать
				</MainButton>
			</div>
		</form>
	);
};

export default EditIncategoryPage;
