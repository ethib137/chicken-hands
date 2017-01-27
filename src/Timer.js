import Component, {Config} from 'metal-jsx';
import Button from './Button';

const INT_SEC = 1000;
const INT_SIXTY = 60;

class Timer extends Component {
	created() {
		this.interval_;

		this.countDown_ = this.countDown_.bind(this);
		this.padDisplayTime_ = this.padDisplayTime_.bind(this);
		this.reset = this.reset.bind(this);
		this.setDisplayTime_ = this.setDisplayTime_.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
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

	chime_() {
	}

	countDown_() {
		if (this.state.currentTime_ > 0) {
			this.state.currentTime_ = this.state.currentTime_ - INT_SEC;
		}
		else {
			this.stop();
			this.chime_();
		}
	}

	padDisplayTime_(val) {
		const str = '' + val;
		const pad = '00';

		return pad.substring(0, pad.length - str.length) + str;
	}

	setDisplayTime_(time) {
		const timeRemainder = time % INT_SIXTY;

		const timeLeft = (time - (timeRemainder)) / INT_SIXTY;

		const timeRight = this.padDisplayTime_(timeRemainder);

		return timeLeft + ':' + timeRight;
	}

	render() {
		const {
			time,
			name
		} = this.props;

		let displayTime;

		const seconds = this.state.currentTime_ / INT_SEC;
		const minutes = (seconds - (seconds % INT_SIXTY)) / INT_SIXTY;

		if (minutes > 59) {
			displayTime = this.setDisplayTime_(minutes);
		}
		else if (seconds > 59) {
			displayTime = this.setDisplayTime_(seconds)
		}
		else {
			displayTime = '0:' + this.padDisplayTime_(seconds);
		}

		return (
			<div class="card timer">
				<div class="card-block">
					<h3 class="card-title">{name}</h3>

					<div class="current-time card-text">{displayTime}</div>

					<div>
						<Button display="success" onClick={this.start} size="sm">
							<span class="glyphicon glyphicon-play" aria-hidden="true"></span>
							</Button>

						<Button display="danger" onClick={this.stop} size="sm">
							<span class="glyphicon glyphicon-stop" aria-hidden="true"></span>
						</Button>

						<Button display="primary" onClick={this.reset} size="sm">
							<span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
						</Button>
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