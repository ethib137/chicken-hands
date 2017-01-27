import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';

import {otherProps} from './lib/util';

class Button extends Component {
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

const BUTTON_TYPES = [
	'danger',
	'info',
	'link',
	'primary',
	'secondary',
	'success',
	'warning'
];

const BUTTON_SIZES = [
	'sm',
	'lg'
];

Button.PROPS = {
	active: Config.bool(),
	display: Config.oneOf(BUTTON_TYPES),
	size: Config.oneOf(BUTTON_SIZES)
};

export default Button;