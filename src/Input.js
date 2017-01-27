import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';

import {otherProps} from '../lib/metal-util';

class Input extends Component {
	render() {
		const {
			active,
			children,
			display,
			size
		} = this.props;

		const classes = getCN(
			'btn',
			'btn-container',
			{
				[`btn-${display}`]: display,
				[`btn-${size}`]: size,
				active
			}
		);

		return (
			<button
				{...otherProps(this)}
				class={classes}
			>
				{children}
			</button>
		);
	}
}

const INPUT_TYPES = [
	'danger',
	'info',
	'link',
	'primary',
	'secondary',
	'success',
	'warning'
];

const INPUT_SIZES = [
	'sm',
	'lg'
];

Input.PROPS = {
	active: Config.bool(),
	display: Config.oneOf(INPUT_TYPES),
	size: Config.oneOf(INPUT_SIZES)
};

export default Input;