'use client';

import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import MainTitle from '@/components/model/ui/MainTitle';
import MainText from '@/components/model/ui/MainText';
import MainInput from '@/components/model/ui/MainInput';
import MainButton from '@/components/model/ui/MainButton';
import { useMutation } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import styles from './GetEmailPage.module.scss';
import AuthService from '@/services/auth.service';
import Link from 'next/link';

interface IGetForm {
	email: string;
}

const GetMailPage = () => {
	const { register, handleSubmit } = useForm<IGetForm>();
	const mutation = useMutation((email: string) => AuthService.postEmail(email));
	const setEmail = useAuthStore(state => state.setEmail);
	const router = useRouter();
	async function onSubmit({ email }: IGetForm) {
		try {
			const { status } = await mutation.mutateAsync(email);
			if (status !== 200) throw Error;
		} catch {
			toast('Почта не существует');
			setEmail('');
			return;
		}
		setEmail(email);
		router.push('/resetcode');
	}
	return (
		<div className={styles.wrapper}>
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
				<div className={styles.title}>
					<MainTitle size="large" className={styles.text}>
						Востановлене пароля
					</MainTitle>
					<MainText
						color="blue"
						type="bold"
						size="small"
						className={styles.text}>
						Введите почту для востановления пароля.
					</MainText>
				</div>
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<MainInput placeholder="Email" type="text" {...register('email')} />
				<MainButton size="large" type="submit">
					Отправить код
				</MainButton>
			</form>
			<button onClick={() => router.back()}>
				<MainText color="blue" type="regular" size="extra-small">
					Вернуться назад
				</MainText>
			</button>
		</div>
	);
};

export default GetMailPage;
