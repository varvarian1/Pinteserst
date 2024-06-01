'use client';

import MainButton from '@/components/model/ui/MainButton';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import MainInput from '@/components/model/ui/MainInput';
import MainTitle from '@/components/model/ui/MainTitle';
import styles from './CreateCategoryPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import CategoryService from '@/services/category.service';

interface ICategoryForm {
	name: string;
}

const CreateCategoryPage = () => {
	const { register, handleSubmit } = useForm<ICategoryForm>();
	const jwt = useAuthStore(state => state.jwt);
	const mutate = useMutation((name: string) =>
		CategoryService.postCategoryCreate(jwt, name),
	);
	const router = useRouter();

	async function onSubmit({ name }: ICategoryForm) {
		try {
			const { status } = await mutate.mutateAsync(name);
			if (status !== 200) throw Error;
		} catch {
			toast.warning('Такое имя уже существует');
			return;
		}
		router.push('/categories');
	}
	const onError = () => toast.info('Введите название категории');
	return (
		<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit, onError)}>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className={styles.container}>
				<MainTitle size="small">Создайте категорию</MainTitle>
				<MainInput
					placeholder="Название категории"
					type="text"
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...register('name', { required: true })}
				/>
				<div className={styles.buttons}>
					<MainButton
						color="gray"
						type="button"
						onClick={() => router.push('/categories')}>
						Отмена
					</MainButton>
					<MainButton type="submit">Создать</MainButton>
				</div>
			</div>
		</form>
	);
};

export default CreateCategoryPage;
