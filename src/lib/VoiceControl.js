import {processCommand} from './commandUtil';

function getNewSpeechRecognition(onResultFunction) {
	let recognition = new webkitSpeechRecognition();

	recognition.continuous = true;
	recognition.interimResults = true;

	// this.recognition.onstart = event => VoiceControl.speak('I\'m listening');
	recognition.onresult = onResultFunction;

	recognition.start();

	return recognition
}

export default class VoiceControl {

	constructor(commandPrefix) {
		this.commandPrefix = commandPrefix.toUpperCase() || 'CHICKEN HANDS';

		this.commandPrefixLastIndex = this.commandPrefix.split(' ').length;

		this.recognition = getNewSpeechRecognition(this.intake.bind(this));
	}

	// @param text String
	// @return String
	getCommandFromString(text) {
		return text.split(' ')
			.slice(this.commandPrefixLastIndex)
			.join(' ')
			.trim();
	}

	// @param text String
	// @return String | null
	getCommandPrefixFromString(text) {
		return text.split(' ')
			.slice(0, this.commandPrefixLastIndex)
			.join(' ')
			.trim();
	}

	// @param event voiceRecognitionEvent
	// @return void
	intake(event) {
		let index = event.resultIndex;

		let result = event.results[index];

		if (result.isFinal) {
			this.processCommand(result[0].transcript);
		}
	}

	// @param commandPrefix String
	// @return boolean
	isValidCommandPrefix(commandPrefix) {
		return commandPrefix === this.commandPrefix;
	}

	// @param text String
	// @return void
	speak(text) {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));

	}

	// @param text String
	// @return void
	processCommand(text) {
		text = text.trim().toUpperCase();

		let prefix = this.getCommandPrefixFromString(text);
		let command = this.getCommandFromString(text);

		if (this.isValidCommandPrefix(prefix)) {
			processCommand(command);
		}
	}

}
