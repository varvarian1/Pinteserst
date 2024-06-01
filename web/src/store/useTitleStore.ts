import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseTitleStore {
	title: string;
	setTitle: (newTitle?: string) => void;
}

const useTitleStore = create<
	IUseTitleStore,
	[['zustand/persist', IUseTitleStore]]
>(
	persist(
		set => ({
			title: '',
			setTitle: (newTitle?: string) => {
				set(() => ({ title: newTitle }));
			},
		}),
		{
			name: 'title',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTitleStore;
