import Component, {Config} from 'metal-jsx';

class Timer extends Component {
	render() {
		const {
			time,
			title
		} = this.props;

		return (
			<div class="timer">
				<h3 class="title">{title}</h3>
				<div class="current-time">{this.state.currentTime}</div>
			</div>
		);
	}
}

Timer.PROPS = {
	time: Config.number(),
	title: Config.string().value('text')
};

Timer.STATE = {
	active: Config.bool(),
	currentTime: Config.number()
};

export default Timer;