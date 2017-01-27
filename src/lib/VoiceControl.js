export default class VoiceControl {
	constructor(commandPrefix) {
		this.commandPrefix = commandPrefix.t() || 'CHICKEN HANDS';

		this.commandPrefixLastIndex = COMMAND_PREFIX.split(' ').length - 1;

		this.commandsNavigationBack = ['BACK', 'LAST', 'PREVIOUS'];
		this.commandsNavigationForward = ['FIRST', 'NEXT'];
		this.commandsTimer = ['END', 'SET', 'START', 'STOP'];
		this.commandsCommon = ['SHOW', 'READ'];

		this.commandsWithArguments = ['SET', 'SHOW', 'START'];

		this.allCommands = [
			...commandsNavigationBack,
			...commandsNavigationForward,
			...commandsTimer,
			...commandsCommon,
		];

		// Initialize Speech Recognition
		this.recognition = new webkitSpeechRecognition();

		this.recognition.continuous = true;
		this.recognition.interimResults = true;

		this.recognition.onstart = event => VoiceControl.speak('I\'m listening');
		this.recognition.onresult = event => this.intake(event);

		this.recognition.start();
	}

	getCommandFromString(text) {
		return text.split(' ')
			.slice(this.commandPrefixLastIndex)
			.join(' ')
			.trim();
	}

	// @return String | null
	getCommandPrefixFromString(text) {
		return text.split(' ')
			.slice(0, this.commandPrefixLastIndex)
			.join(' ')
			.trim();
	}

	// @return void
	intake(event) {
		let index = event.resultIndex;

		let result = event.results[index];

		if (result.isFinal) {
			this.processCommand(result[0].transcript);
		}
	}

	// @return boolean
	isValidCommandPrefix(commandPrefix) {
		return commandPrefix === this.commandPrefix;
	}

	// @return boolean
	isValidCommand(commandWordsArray) {
		return commandWordsArray
			.some(command => this.allCommands.includes(command));
	}

	// @return void
	static speak() {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
	}

	processCommand(text) {
		text = text.trim().toUpperCase();

		let prefix = this.getCommandPrefixFromString(text);

		if (isValidCommandPrefix(prefix)) {
			// console.log('YES chicken hands');
			speak('Good job, you said chicken hands');
		} else {
			// console.log('did not say chicken hands');
			speak('Please say chicken hands and then a command');
		}

		let command = this.getCommandFromString(text);
	}

}