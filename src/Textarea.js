import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';

import {otherProps} from './lib/util';

class Textarea extends Component {
	render() {
		const {
			placeholder,
			rows,
			value
		} = this.props;

		const classes = getCN(
			'form-control',
			'textarea-container'
		);

		return (
			<textarea
				{...otherProps(this)}
				class={classes}
				placeholder={placeholder}
				rows={rows}
				value={value}
			/>
		);
	}
}

Textarea.PROPS = {
	placeholder: Config.string(),
	rows: Config.number().value(3),
	value: Config.string()
};

export default Textarea;