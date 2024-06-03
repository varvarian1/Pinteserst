import { create } from 'zustand';

interface IUseModalStore {
	id: number;
	oneCardModal: boolean;
	noCardsModal: boolean;
	exitModal: boolean;
	isFinish: boolean;

	setId: (newId: number) => void;
	setOneCardModal: (newState: boolean) => void;
	setNoCardModal: (newState: boolean) => void;
	setExitModal: (newState: boolean) => void;
	setIsFinish: (newState: boolean) => void;
}

const useModalStore = create<IUseModalStore>(set => ({
	id: 0,
	oneCardModal: false,
	noCardsModal: false,
	exitModal: false,
	isFinish: false,
	setId: (newId: number) => {
		set(() => ({ id: newId }));
	},
	setOneCardModal: (newState: boolean) => {
		set(() => ({ oneCardModal: newState }));
	},
	setNoCardModal: (newState: boolean) => {
		set(() => ({ noCardsModal: newState }));
	},
	setExitModal: (newState: boolean) => {
		set(() => ({ exitModal: newState }));
	},
	setIsFinish: (newState: boolean) => {
		set(() => ({ isFinish: newState }));
	},
}));

export default useModalStore;
