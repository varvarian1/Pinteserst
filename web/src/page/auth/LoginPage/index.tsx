'use client';

import MainButton from '@/components/ui/MainButton';
import { useMutation } from 'react-query';
import AuthService from '@/services/auth.service';
import styles from '../auth.module.scss';
import MainInput from '@/components/ui/MainInput';
import { useForm } from 'react-hook-form';
import ILoginPage from './login-page.interface';
import Link from 'next/link';
import Image from 'next/image';
import { CircleX } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { isAuth, setJWT } from '@/store/slices/authSlices';

const LoginPage = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<ILoginPage>({ mode: 'onBlur' });

	const dispatch = useDispatch();

	const mutation = useMutation(({ email, password }: ILoginPage) =>
		AuthService.postLogin(email, password),
	);

	const onSubmit = async ({ email, password }: ILoginPage) => {
		try {
			const result = await mutation.mutateAsync({ email, password });
			if (result !== undefined) {
				dispatch(isAuth(true));
				dispatch(setJWT(result.access));
			}
		} catch {
			console.log('Пароль или имя пользователя невалидны!');
		}
	};

	return (
		<form className={styles.auth} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.auth__title}>Login</h1>
			<div className={styles.auth__inputs}>
				<div className={styles.auth__inputs_holder}>
					<MainInput
						className={`${styles.auth__input} ${errors?.email && styles.error}`}
						type="email"
						placeholder="Email"
						{...register('email', {
							required: 'This field is required',
							minLength: {
								value: 5,
								message: 'Email is too short',
							},
							maxLength: {
								value: 36,
								message: 'Email is too long',
							},
							validate: {
								noRussianLetters: value =>
									!/[А-яЁё]/.test(value) ||
									'Email must not contain Russian letters',
								validFormat: value =>
									/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
										value,
									) || 'Invalid email format',
							},
						})}
					/>
					{errors?.email && (
						<div className={styles.auth__error}>
							<CircleX className={styles.auth__error_image} />
							<p className={styles.auth__error_text}>
								{errors?.email?.message || 'Error email field!'}
							</p>
						</div>
					)}
				</div>
				<div className={styles.auth__inputs_holder}>
					<MainInput
						className={`${styles.auth__input} ${errors?.password && styles.error}`}
						type="password"
						placeholder="Password"
						{...register('password', {
							required: 'This field is required',
							minLength: {
								value: 5,
								message: 'Password is too short',
							},
							maxLength: {
								value: 36,
								message: 'Password is too long',
							},
							validate: {
								noRussianLetters: value =>
									!/[А-яЁё]/.test(value) ||
									'Password must not contain Russian letters',
								hasUpperCase: value =>
									/[A-Z]/.test(value) ||
									'Password must contain at least one uppercase letter',
								hasNumber: value =>
									/\d/.test(value) ||
									'Password must contain at least one number',
							},
						})}
					/>
					{errors?.password && (
						<div className={styles.auth__error}>
							<CircleX className={styles.auth__error_image} />
							<p className={styles.auth__error_text}>
								{errors?.password?.message ||
									'Password email field!'}
							</p>
						</div>
					)}
					<div className={styles.auth__recovery}>
						<Link
							className={styles.auth__recovery_link}
							href="/recovery-password">
							Forgot password
						</Link>
					</div>
				</div>
			</div>
			<MainButton
				className={styles.auth__button}
				type="submit"
				disabled={!isValid}>
				Login
			</MainButton>
			<p className={styles.auth__or}>or</p>
			<div className={styles.through}>
				<Link className={styles.through__holder} href="/google">
					<Image
						className={styles.through__image}
						width={40}
						height={40}
						alt="Google logo"
						src="/img/google-logo.svg"
					/>
					<p className={styles.through__name}>Google</p>
				</Link>
				<Link className={styles.through__holder} href="/github">
					<Image
						className={styles.through__image}
						width={40}
						height={40}
						alt="GitHub logo"
						src="/img/github-logo.svg"
					/>
					<p className={styles.through__name}>GitHub</p>
				</Link>
			</div>
			<p className={styles.auth__another}>
				Don’t have an account?&nbsp;
				<Link
					className={styles.auth__another_link}
					href="/registration">
					Create an account
				</Link>
			</p>
		</form>
	);
};

export default LoginPage;
