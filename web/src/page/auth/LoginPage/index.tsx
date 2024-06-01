'use client';

import MainButton from '@/components/ui/MainButton';
import { useMutation } from 'react-query';
import AuthService from '@/services/auth.service';
import styles from './LoginPage.module.scss';
import MainInput from '@/components/ui/MainInput';
import { useForm } from 'react-hook-form';

interface ILoginPage {
	email: string;
	password: string;
}

const LoginPage = () => {
	const { register, handleSubmit } = useForm<ILoginPage>();

	const mutation = useMutation(({ email, password }: any) =>
		AuthService.postLogin(email, password),
	);

	const onSubmit = async ({ email, password }: ILoginPage) => {
		try {
			console.log(email, password);
			const result = (await mutation.mutateAsync({ email, password }))
				.data;
			if (result !== undefined) console.log('Result undefined');
		} catch (err) {
			console.log('Пароль или имя пользователя невалидны!');
		}
	};

	return (
		<form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.login__title}>Login page</h1>
			<div className={styles.login__inputs}>
				<MainInput
					className={styles.login__input}
					type="email"
					placeholder="Email"
					{...register('email')}
				/>
				<MainInput
					className={styles.login__input}
					type="password"
					placeholder="Password"
					{...register('password')}
				/>
			</div>
			<MainButton className={styles.login__button} type="submit">
				Login
			</MainButton>
		</form>
	);
};

export default LoginPage;
