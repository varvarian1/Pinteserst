import ProfilePage from '@/page/main/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Профиль / Настройки',
};

const Page = () => {
	return <ProfilePage />;
};

export default Page;
