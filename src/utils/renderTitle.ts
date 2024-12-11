import figlet from 'figlet';

export const renderTitle = () => {
	const text = figlet.textSync('Bishop CLI', {
		font: 'Larry 3D',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 180,
		whitespaceBreak: true,
	});
	console.log(`\n${text}\n`);
};
