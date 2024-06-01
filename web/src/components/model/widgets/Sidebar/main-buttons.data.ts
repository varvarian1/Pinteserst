import {
	BookA,
	Home,
	Layers,
	LayoutGrid,
	MessagesSquare,
	SquareLibrary,
	SquareUser,
} from 'lucide-react';

const MAIN_BUTTONS = [
	{
		url: '/home',
		title: 'Главная',
		Icon: Home,
	},
	{
		url: '/categories',
		title: 'Категории',
		Icon: LayoutGrid,
	},
	{
		url: '/training',
		title: 'Тренироваться',
		Icon: Layers,
	},
	{
		url: '/phrases',
		title: 'Фразы',
		Icon: MessagesSquare,
	},
	{
		url: '/my-cards',
		title: 'Мои карточки',
		Icon: SquareLibrary,
	},
	{
		url: '/dictionary',
		title: 'Мой словарь',
		Icon: BookA,
	},
	{
		url: '/profile',
		title: 'Профиль',
		Icon: SquareUser,
	},
];

export default MAIN_BUTTONS;
