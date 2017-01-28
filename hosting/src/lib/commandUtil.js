import {intersection} from 'lodash';

const COMMANDS_INCREASE_FONT = ['BIGGER', 'LARGER', 'INCREASE', 'BIG', 'LARGE'];
const COMMANDS_DECREASE_FONT = ['SMALLER', 'TINY', 'DECREASE', 'SMALL'];
const COMMANDS_INGREDIENT = ['INGREDIENT', 'INGREDIENTS'];

const COMMANDS_MAXIMIZE = ['MAXIMIZE', 'START', 'FULL SCREEN'];
const COMMANDS_MINIMIZE = ['MINIMIZE', 'STOP', 'HIDE', 'CLOSE'];

const COMMANDS_NAVIGATION_BACK = ['BACK', 'FIRST', 'PREVIOUS'];
const COMMANDS_NAVIGATION_FORWARD = ['LAST', 'NEXT', 'FORWARD'];

const COMMANDS_NAVIGATION = [...COMMANDS_NAVIGATION_BACK, ...COMMANDS_NAVIGATION_FORWARD];

const COMMANDS_TIMER_BEGIN = [SET, 'START'];
const COMMANDS_TIMER_END = ['END', 'STOP'];

const COMMANDS_TIMER = [...COMMANDS_TIMER_BEGIN, ...COMMANDS_TIMER_END];

const COMMANDS_COMMON = ['SHOW', READ];

const COMMANDS_ALL = [
	...COMMANDS_NAVIGATION,
	...COMMANDS_TIMER,
	...COMMANDS_COMMON
];

const COMMANDS_WITH_ARGUMENTS = [READ, SET, 'SHOW', 'START'];

const DECREASE_FONT = 'DECREASE_FONT';
const INCREASE_FONT = 'INCREASE_FONT';
const INGREDIENT = 'INGREDIENT';
const MAXIMIZE = 'MAXIMIZE';
const MINIMIZE = 'MINIMIZE';
const NAVIGATE_BACK = 'NAVIGATE_BACK';
const NAVIGATE_FORWARD = 'NAVIGATE_FORWARD';
const NO_ACTION = 'NO_ACTION'
const READ = 'READ';
const SET = 'SET';

export const ACTIONS = {
	DECREASE_FONT,
	INCREASE_FONT,
	INGREDIENT,
	MAXIMIZE,
	MINIMIZE,
	NAVIGATE_BACK,
	NAVIGATE_FORWARD,
	NO_ACTION,
	READ
}

function isValidCommand(commandString) {
	return arrayContainsElements(commandString.split(' '), COMMANDS_ALL);
}

function arrayContainsElements(arr1, arr2) {
	return intersection(arr1, arr2).length > 0;
}

export function processCommand(commandString) {
	let commandsArray = commandString.split(' ');

	let commandObject = {
		action: ACTIONS.NO_ACTION,
		data: {}
	};


	if (arrayContainsElements(commandsArray, COMMANDS_INCREASE_FONT)) {
		commandObject.action = ACTIONS.INCREASE_FONT;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_DECREASE_FONT)) {
		commandObject.action = ACTIONS.DECREASE_FONT;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_INGREDIENT)) {
		commandObject.action = ACTIONS.INGREDIENT;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_MAXIMIZE)) {
		commandObject.action = ACTIONS.MAXIMIZE;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_MINIMIZE)) {
		commandObject.action = ACTIONS.MINIMIZE;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_NAVIGATION_BACK)) {
		commandObject.action = ACTIONS.NAVIGATE_BACK;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_NAVIGATION_FORWARD)) {
		commandObject.action = ACTIONS.NAVIGATE_FORWARD;
	}
	else if (commandsArray.includes(READ)) {
		commandObject.action = ACTIONS.READ;
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_TIMER)) {
		return console.log('Doing something with a timer');
	}
	else if (arrayContainsElements(commandsArray, COMMANDS_COMMON)) {
		return console.log('Doing some common command');
	}

	return commandObject;

}