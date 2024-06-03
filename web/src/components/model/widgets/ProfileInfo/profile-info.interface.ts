export interface IUserInfo {
	name: string;
	email: string;
	level: number;
	createdCards: number;
	createdCategories: number;
	swiped: number;
	swipedCategories: number;
	currentLevel: string;
}

export interface IRegisterPage {
	username: string;
	password: string;
	repeatPassword: string;
	email: string;
}
