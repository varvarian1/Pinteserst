'use client';

import MainInput from '@/components/model/ui/MainInput';
import MainTitle from '@/components/model/ui/MainTitle';
import MainText from '@/components/model/ui/MainText';
import MainButton from '@/components/model/ui/MainButton';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import styles from './ResetCodePage.module.scss';
import AuthService from '@/services/auth.service';

interface IResetForm {
	code: string;
}

const ResetCodePage = () => {
	const { register, handleSubmit } = useForm<IResetForm>();
	const [time, setTime] = useState<number>(180);
	const [sendCode, setSendCode] = useState<boolean>(false);
	const [firstSend, setFirstSend] = useState<boolean>(true);
	const mutationGet = useMutation((email: string) =>
		AuthService.getAuthCodeChangePassword(email),
	);
	const email = useAuthStore(state => state.email);
	const mutationPost = useMutation((code: string) =>
		AuthService.postAuthCodeCheck(code, email),
	);
	const router = useRouter();

	useEffect(() => {
		if (firstSend) {
			mutationGet.mutate(email);
			setFirstSend(false);
		}
		if (time === 0) {
			setSendCode(true);
		}
		setTimeout(() => {
			if (time > 0) setTime(time - 1);
		}, 1000);
	}, [time]);

	function formatTime(duration: number) {
		const minutes = duration / 60;
		const seconds = duration % 60;
		if (seconds < 10) return `${parseInt(minutes.toString(), 10)}:0${seconds}`;
		return `${parseInt(minutes.toString(), 10)}:${seconds}`;
	}

	async function onSubmit(answer: IResetForm) {
		if (answer.code === '') {
			toast('Введите код');
			return;
		}
		try {
			const { status } = await mutationPost.mutateAsync(answer.code);
			if (status !== 200) throw Error;
			router.push('/changepassword');
		} catch (ex) {
			toast('Некоректный код');
		}
	}

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
			<MainTitle size="large" className={styles.text}>
				Восстановление пароля
			</MainTitle>
			<MainText
				color="blue"
				type="bold"
				size="small"
				className={styles['small-text']}>
				Вам на почту будет отправлен код для восстановления вашего пароля.
			</MainText>
			<MainInput
				placeholder="Код"
				type="text"
				className={styles.input}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register('code')}
			/>
			<MainButton size="large" type="submit">
				Подтвердить
			</MainButton>
			<div className={styles['under-btn-text']}>
				<MainText
					type="regular"
					size="extra-small"
					className={styles.send}
					color="blue">
					<button
						type="button"
						aria-label="Request code again"
						onClick={() => {
							if (sendCode) {
								setSendCode(false);
								mutationGet.mutate(email);
								setTime(180);
							}
						}}>
						Отправить код повторно через:
					</button>
				</MainText>
				<MainText size="extra-small">{formatTime(time)}</MainText>
			</div>
		</form>
	);
};

export default ResetCodePage;
