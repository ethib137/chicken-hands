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

		this.onlisteningchange = event => event;
		this.oncommand = event => event;

		this.fireListeningChange(true);

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

	fireListeningChange(readyToListen) {
		this.readytolisten = readyToListen;

		this.onlisteningchange({readyToListen});
	}

	// @param event voiceRecognitionEvent
	// @return void
	intake(event) {
		if (this.readytolisten) {
			this.fireListeningChange(false);
		}

		let index = event.resultIndex;

		let result = event.results[index];

		if (result.isFinal) {
			this.parseCommand(result[0].transcript);

			this.fireListeningChange(true);
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
	parseCommand(text) {
		text = text.trim().toUpperCase();

		let prefix = this.getCommandPrefixFromString(text);
		let command = this.getCommandFromString(text);

		if (this.isValidCommandPrefix(prefix)) {
			let commandObject = processCommand(command);

			this.oncommand(commandObject);
		}
	}

}
