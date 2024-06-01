'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import AuthService from '@/services/auth.service';
import styles from './RegistrationPage.module.scss';
import MainInput from '@/components/ui/MainInput';
import MainButton from '@/components/ui/MainButton';

interface IRegisterPage {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
}

const RegistrationPage = () => {
	const { register, handleSubmit } = useForm<IRegisterPage>();

	const mutation = useMutation(
		({ name, email, password, repeatPassword }: any) =>
			AuthService.postRegister(name, email, password, repeatPassword),
	);

	const onSubmit = async ({
		name,
		email,
		password,
		repeatPassword,
	}: IRegisterPage) => {
		try {
			console.log(name, email, password, repeatPassword);
			const result = (
				await mutation.mutateAsync({
					name,
					email,
					password,
					repeatPassword,
				})
			).data;
			if (result !== undefined) console.log('Result undefined');
		} catch (err) {
			console.log('Пароль или имя пользователя невалидны!');
		}
	};

	return (
		<form className={styles.registration} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.registration__title}>Registration page</h1>
			<div className={styles.registration__inputs}>
				<MainInput
					className={styles.registration__input}
					type="name"
					placeholder="Name"
					{...register('name')}
				/>
				<MainInput
					className={styles.registration__input}
					type="email"
					placeholder="Email"
					{...register('email')}
				/>
				<MainInput
					className={styles.registration__input}
					type="password"
					placeholder="Password"
					{...register('password')}
				/>
				<MainInput
					className={styles.registration__input}
					type="password"
					placeholder="Repeat password"
					{...register('repeatPassword')}
				/>
			</div>
			<MainButton className={styles.registration__button} type="submit">
				Register
			</MainButton>
		</form>
	);
};

export default RegistrationPage;
