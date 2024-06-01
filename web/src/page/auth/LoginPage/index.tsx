'use client';

import MainButton from '@/components/ui/MainButton';
import { useState } from 'react';
import { useMutation } from 'react-query';
import AuthService from '@/services/auth.service';

const LoginPage = () => {
	const [username, setUsername] = useState('Hozzi');
	const [password, setPassword] = useState('12345');

	const mutation = useMutation(({ username, password }: any) =>
		AuthService.postLogin(username, password),
	);

	const setIsAuth = async () => {
		const data = await mutation.mutateAsync({
			username,
			password,
		});
	};
	return (
		<div>
			<h1>LoginPage</h1>
			<MainButton onClick={() => setIsAuth()}>Send request</MainButton>
		</div>
	);
};

export default LoginPage;
