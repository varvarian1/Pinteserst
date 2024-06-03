'use client';

import { toast, ToastContainer } from 'react-toastify';
import MainTitle from '@/components/model/ui/MainTitle';
import MainText from '@/components/model/ui/MainText';
import { useForm } from 'react-hook-form';
import MainInput from '@/components/model/ui/MainInput';
import MainButton from '@/components/model/ui/MainButton';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import styles from './ChangePasswordPage.module.scss';
import AuthService from '@/services/auth.service';

interface IChangeForm {
	password: string;
	repeat: string;
}

const ChangePasswordPage = () => {
	const { register, handleSubmit } = useForm<IChangeForm>();
	const email = useAuthStore(state => state.email);
	const setEmail = useAuthStore(state => state.setEmail);
	const mutation = useMutation((newPassword: string) =>
		AuthService.postAuthChangePassword(newPassword, email),
	);
	const router = useRouter();
	async function onSubmit({ password, repeat }: IChangeForm) {
		if (password !== repeat) {
			toast.error('Пароли не совпадают');
			return;
		}
		try {
			const { status } = await mutation.mutateAsync(password);
			if (status !== 200) throw Error;
			setEmail('');
			router.push('/login');
		} catch (ex) {
			toast('Ошибка');
		}
	}
	const onError = () => {
		toast.error('Не все поля заполнены!');
	};
	return (
		<form
			className={styles.container}
			onSubmit={handleSubmit(onSubmit, onError)}>
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
			<MainTitle size="large" className={styles.text}>
				Создание нового пароля
			</MainTitle>
			<MainText color="blue" size="small" className={styles['small-text']}>
				Пароль был сброшен, пожалуйста введите новый пароль.
			</MainText>
			<MainInput
				placeholder="Новый пароль"
				type="password"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('password', { required: true })}
			/>
			<MainInput
				placeholder="Подтверждение нового пароля"
				type="password"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('repeat', { required: true })}
			/>
			<MainButton size="large" color="blue" type="submit">
				Подтвердить
			</MainButton>
			<MainText
				size="extra-small"
				type="regular"
				color="blue"
				className={styles.back}>
				<button
					onClick={() => router.back()}
					type="button"
					aria-label="Return back">
					Вернуться назад
				</button>
			</MainText>
		</form>
	);
};

export default ChangePasswordPage;
