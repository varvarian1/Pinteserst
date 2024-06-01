import ProfilePage from '@/page/main/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Профиль',
};

const Page = () => {
	return <ProfilePage />;
};

export default Page;
