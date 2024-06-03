'use client';

import MainTitle from '@/components/model/ui/MainTitle';
import MainInput from '@/components/model/ui/MainInput';
import MainButton from '@/components/model/ui/MainButton';
import MainText from '@/components/model/ui/MainText';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import styles from './RegisterPage.module.scss';
import AuthService from '@/services/auth.service';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';

interface IRegisterPage {
	username: string;
	password: string;
	repeatPassword: string;
	email: string;
}

interface ILogin {
	username: string;
	password: string;
}

const RegisterPage = () => {
	const { register, handleSubmit } = useForm<IRegisterPage>();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const router = useRouter();
	const { setJwt } = useAuthStore(({ setJwt }) => ({ setJwt }));
	const mutationRegister = useMutation(
		({ username, password, email }: IRegisterPage) =>
			AuthService.postRegister(username, password, email),
	);
	const mutationLogin = useMutation(({ username, password }: ILogin) =>
		AuthService.postLogin(username, password),
	);
	useEffect(() => {
		if (!mutationRegister.isSuccess) return;
		try {
			mutationLogin.mutateAsync({ username, password });
		} catch {
			toast.error('Ошибка авторизакии!');
		}
	}, [mutationRegister.isSuccess]);
	useEffect(() => {
		if (!mutationLogin.isSuccess) return;
		setJwt(mutationLogin.data.data);
		router.push('/home');
	}, [mutationLogin.isSuccess]);
	const onSubmit = async ({
		username,
		password,
		email,
		repeatPassword,
	}: IRegisterPage) => {
		setUsername(username);
		setPassword(password);
		if (
			username === '' ||
			password === '' ||
			email === '' ||
			repeatPassword === ''
		) {
			toast('Не все поля заполнены');
			return;
		}

		if (password !== repeatPassword) {
			toast('Пароли не совпадают');
			return;
		}

		try {
			await mutationRegister.mutateAsync({
				username,
				email,
				password,
				repeatPassword,
			});
		} catch (err) {
			toast('Пользователь с таким именем или почтой уже существует');
			return;
		}
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
			<MainTitle size="large">Регистрация</MainTitle>
			<MainInput
				placeholder="Ваше имя"
				type="text"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('username')}
			/>
			<MainInput
				placeholder="Почта"
				type="email"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('email')}
			/>
			<MainInput
				placeholder="Пароль"
				type="password"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('password')}
			/>
			<MainInput
				placeholder="Подтверждение пароля"
				type="password"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('repeatPassword')}
			/>
			<MainButton
				size="large"
				type="submit"
				color="blue"
				className={styles.btn}>
				Зарегистрироваться
			</MainButton>
			<div className={styles['under-btn-text']}>
				<MainText type="regular" size="extra-small">
					Уже есть аккаунт?
				</MainText>
				<MainText type="regular" size="extra-small" color="blue">
					<Link href="/login">Авторизуйтесь!</Link>
				</MainText>
			</div>
		</form>
	);
};

export default RegisterPage;
