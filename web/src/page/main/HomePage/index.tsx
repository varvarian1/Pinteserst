'use client';

import { useDispatch, useSelector } from 'react-redux';
import { isAuth, setJWT } from '@/store/slices/authSlices';
import { useRouter } from 'next/navigation';

const HomePage = () => {
	const auth = useSelector((state: any) => state.auth.isAuth);
	const dispatch = useDispatch();
	const router = useRouter();

	function handleExitProfile() {
		dispatch(isAuth(false));
		dispatch(setJWT(''));
		router.push('/login');
	}

	return (
		<div>
			<h1>HomePage</h1>
			<button onClick={handleExitProfile}>Exit</button>
		</div>
	);
};

export default HomePage;
