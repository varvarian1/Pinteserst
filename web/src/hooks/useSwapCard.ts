'use client';

import { useEffect, useState } from 'react';

const useSwapCard = () => {
	const [isOpen, setIsOpen] = useState(false);
	function openTranslation(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			setIsOpen(true);
		}
	}
	function closeTranslation(e: KeyboardEvent) {
		if (
			e.key === 'ArrowDown' ||
			e.key === 'ArrowRight' ||
			e.key === 'ArrowLeft'
		) {
			setIsOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', e => openTranslation(e));
		document.addEventListener('keydown', e => closeTranslation(e));

		return () => {
			document.removeEventListener('keydown', e => openTranslation(e));
			document.removeEventListener('keydown', e => closeTranslation(e));
		};
	});

	return {
		isOpen,
		setIsOpen,
	};
};

export default useSwapCard;
