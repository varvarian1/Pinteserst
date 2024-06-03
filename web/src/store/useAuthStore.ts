import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IAuthStore {
	jwt: string;
	email: string;
	setJwt: (newJwt: string) => void;
	setEmail: (newEmail: string) => void;
}

const useAuthStore = create<IAuthStore, [['zustand/persist', IAuthStore]]>(
	persist(
		set => ({
			jwt: '',
			email: '',
			setJwt: (newJwt: string) => {
				set(() => ({
					jwt: newJwt,
				}));
			},
			setEmail: (newEmail: string) => {
				set(() => ({
					email: newEmail,
				}));
			},
		}),
		{
			name: 'auth',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAuthStore;
