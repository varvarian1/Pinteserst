import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseTutorStore {
	show: boolean;
	setShow: (newShow: boolean) => void;
}

const useTutorStore = create<
	IUseTutorStore,
	[['zustand/persist', IUseTutorStore]]
>(
	persist(
		set => ({
			show: true,
			setShow: (newShow: boolean) => {
				set(() => ({ show: newShow }));
			},
		}),
		{
			name: 'tutor',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTutorStore;
