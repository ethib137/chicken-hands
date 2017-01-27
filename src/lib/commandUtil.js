import {intersection} from 'lodash';

const READ = 'READ';
const SET = 'SET';

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

function isValidCommand(commandString) {
	return arrayContainsElements(commandString.split(' '), COMMANDS_ALL);
}

function arrayContainsElements(arr1, arr2) {
	return intersection(arr1, arr2).length > 0;
}

export function processCommand(commandString) {
	if (!isValidCommand(commandString)) {
		return console.log('No valid commands found');
	}

	let commandsArray = commandString.split(' ');

	if (arrayContainsElements(commandsArray, COMMANDS_NAVIGATION_BACK)) {
		return console.log('Navigating back');
	}

	if (arrayContainsElements(commandsArray, COMMANDS_NAVIGATION_FORWARD)) {
		return console.log('Navigating forward');
	}

	if (arrayContainsElements(commandsArray, COMMANDS_TIMER)) {
		return console.log('Doing something with a timer');
	}

	if (arrayContainsElements(commandsArray, COMMANDS_COMMON)) {
		return console.log('Doing some common command');
	}

}