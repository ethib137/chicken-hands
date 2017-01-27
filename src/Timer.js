import Component, {Config} from 'metal-jsx';
import Button from './Button';

const INT_SEC = 1000;
const INT_SIXTY = 60;

class Timer extends Component {
	created() {
		this.interval_;

		this.countDown_ = this.countDown_.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.padDisplayTime_ = this.padDisplayTime_.bind(this);
	}

	reset() {
		this.stop();

		this.state.currentTime_ = this.props.time;
	}

	start() {
		this.interval_= setInterval(this.countDown_, INT_SEC);
	}

	stop() {
		if (this.interval_) {
			clearInterval(this.interval_);
		}
	}

	syncTime(newVal) {
		this.state.currentTime_ = newVal;
	}

	countDown_() {
		this.state.currentTime_ = this.state.currentTime_ - INT_SEC;
	}

	padDisplayTime_(val) {
		var str = '' + val;
		var pad = '00';

		return pad.substring(0, pad.length - str.length) + str;
	}

	render() {
		const {
			time,
			name
		} = this.props;

		var seconds = this.state.currentTime_ / INT_SEC;
		var displaySeconds = seconds % INT_SIXTY;
		var displayMinutes = (seconds - displaySeconds) / INT_SIXTY;

		displaySeconds = this.padDisplayTime_(displaySeconds);

		var displayTime = displayMinutes + ':' + displaySeconds;

		if (displayMinutes > 59) {
			var displayHours = (displayMinutes - (displayMinutes % INT_SIXTY)) / INT_SIXTY;
			var displayMinutes = displayMinutes % INT_SIXTY;

			displayMinutes = this.padDisplayTime_(displayMinutes);

			displayTime = displayHours + ':' + displayMinutes;
		}


		return (
			<div class="card timer">
				<div class="card-block">
					<h3 class="card-title">{name}</h3>

					<div class="current-time card-text">{displayTime}</div>

					<div>
						<Button display="success" onClick={this.start} size="sm">Start</Button>

						<Button display="danger" onClick={this.stop} size="sm">Stop</Button>

						<Button display="primary" onClick={this.reset} size="sm">Reset</Button>
					</div>
				</div>
			</div>
		);
	}
}

Timer.PROPS = {
	time: Config.number(),
	name: Config.string().value('text')
};

Timer.STATE = {
	active_: Config.bool(),
	currentTime_: Config.number()
};

export default Timer;