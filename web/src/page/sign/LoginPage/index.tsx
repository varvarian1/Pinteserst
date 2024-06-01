'use client';

import MainTitle from '@/components/model/ui/MainTitle';
import MainInput from '@/components/model/ui/MainInput';
import MainButton from '@/components/model/ui/MainButton';
import MainText from '@/components/model/ui/MainText';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.scss';
import AuthService from '@/services/auth.service';

interface ILoginPage {
	username: string;
	password: string;
}

const LoginPage = () => {
	const { register, handleSubmit } = useForm<ILoginPage>();
	const setJwt = useAuthStore(state => state.setJwt);
	const router = useRouter();
	const mutation = useMutation(({ username, password }: ILoginPage) =>
		AuthService.postLogin(username, password),
	);

	const onSubmit = async ({ username, password }: ILoginPage) => {
		try {
			const result = (await mutation.mutateAsync({ username, password })).data;
			if (result !== undefined) setJwt(result);
			router.push('/home');
		} catch (err) {
			toast('Пароль или имя пользователя невалидны!');
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
			<MainTitle size="large">Вход</MainTitle>
			<MainInput
				placeholder="Имя пользователя"
				type="text"
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('username')}
			/>
			<MainInput
				placeholder="Пароль"
				type="password"
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('password')}
			/>
			<MainText
				color="blue"
				type="regular"
				size="extra-small"
				className={styles.forgot}>
				<Link href="/getmail">Забыли пароль?</Link>
			</MainText>
			<MainButton size="large" type="submit" color="blue">
				Войти
			</MainButton>
			<div className={styles['under-btn-text']}>
				<MainText type="regular" size="extra-small">
					Нет аккаунта?
				</MainText>
				<MainText type="regular" size="extra-small" color="blue">
					<Link href="/registration">Зарегистрируйтесь</Link>
				</MainText>
			</div>
		</form>
	);
};

export default LoginPage;
