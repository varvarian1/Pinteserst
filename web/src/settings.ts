interface ISettings {
	expAddFromPassedPerCard: number;
	expAddFromKnowPerCard: number;
	coefficientAddExp: number;
}

const settings: ISettings = {
	expAddFromPassedPerCard: 25,
	expAddFromKnowPerCard: 50,
	coefficientAddExp: 0.005, // Max 0.005, Min - 0.0001
};

export default settings;
