'use client';

import MainInput from '@/components/model/ui/MainInput';
import MainTitle from '@/components/model/ui/MainTitle';
import ImageInput from '@/components/model/ui/ImageInput';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { isAxiosError } from 'axios';
import MainButton from '@/components/model/ui/MainButton';
import useTitleStore from '@/store/useTitleStore';
import React, { useEffect, useState } from 'react';
import styles from './CreateCardPage.module.scss';
import CardsService from '@/services/cards.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageMinus } from 'lucide-react';
import MainText from '@/components/model/ui/MainText';

interface ICardForm {
	engtext: string;
	rustext: string;
	image?: FileList;
}

const CreateCardPage = ({ catid }: { catid: number | undefined }) => {
	const [imageUrl, setImageUrl] = useState('');
	const { register, handleSubmit, setValue } = useForm<ICardForm>();
	const { setTitle } = useTitleStore(state => state);
	const jwt = useAuthStore(state => state.jwt);
	const styled: React.CSSProperties = {
		display: imageUrl === '' ? 'none' : '',
	};
	const mutation = useMutation((data: ICardForm) =>
		CardsService.postCardCreate(
			jwt,
			'multipart/form-data',
			data.engtext,
			data.rustext,
			data.image,
		),
	);

	const mutationCat = useMutation(
		({ data, categoryid }: { data: ICardForm; categoryid: number }) =>
			CardsService.postCardCreate(
				jwt,
				'multipart/form-data',
				data.engtext,
				data.rustext,
				data.image,
				categoryid,
			),
	);
	const router = useRouter();
	const setJwt = useAuthStore(state => state.setJwt);

	useEffect(() => {
		setValue('image', undefined);
		setTitle('Создание карточки');
		document.getElementById('submit')?.focus();
	}, []);

	async function onSubmit(data: ICardForm) {
		let status: number = 0;
		try {
			if (catid === undefined)
				status = (await mutation.mutateAsync(data)).status;
			else
				status = (await mutationCat.mutateAsync({ data, categoryid: catid }))
					.status;
			if (status !== 200) throw Error;
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 401) {
				setJwt('');
				router.replace('/login');
			}
			toast.warning('Ошибка');
			return;
		}
		if (catid !== undefined) router.push(`/categories/edit-category/${catid}`);
		else router.push(`/my-cards`);
	}

	const error = () => {
		toast.info('Не все поля заполнены коректно');
	};

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

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit, error)}>
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
				limit={1}
				theme="light"
			/>
			<MainTitle>Создайте карточку</MainTitle>
			<MainInput
				type="text"
				placeholder="Английское слово"
				{...register('engtext', { required: true, maxLength: 45 })}
			/>
			<MainInput
				type="text"
				placeholder="Русское слово"
				{...register('rustext', { required: true, maxLength: 45 })}
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
					disabled={imageUrl !== ''}
					imageUrl={imageUrl}
					{...register('image', {
						onChange: e => {
							const { files } = e.target;
							if (files && files.length > 0) {
								const file = files[files.length - 1];
								handleImageChange(file);
								setValue('image', files);
							}
						},
					})}
				/>
			</div>
			<div className={styles.buttons}>
				<MainButton
					color="gray"
					type="button"
					onClick={() => router.push(`/categories/edit-category/${catid}`)}>
					Отмена
				</MainButton>
				<MainButton type="submit" id="submit">
					Создать
				</MainButton>
			</div>
		</form>
	);
};

export default CreateCardPage;
