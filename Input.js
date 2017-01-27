import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';

import {otherProps} from '../lib/metal-util';

class Input extends Component {
	render() {
		const {
			placeholder,
			type,
			value
		} = this.props;

		const classes = getCN(
			'form-control',
			'input-container'
		);

		return (
			<input
				{...otherProps(this)}
				class={classes}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
		);
	}
}

Input.PROPS = {
	placeholder: Config.string(),
	type: Config.string().value('text'),
	value: Config.string()
};

export default Input;