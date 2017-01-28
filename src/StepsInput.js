import "./styles/steps-input.css";

import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';
import {bindAll, cloneDeep} from 'lodash';

import {otherProps} from './lib/util';

import Button from './Button';
import Input from './Input';

class Step extends Component {
	created() {
		bindAll(
			this,
			'onChange_'
		);
	}

	onChange_({target}) {
		this.props.onChange(
			{
				index: this.props.index,
				value: target.value
			}
		);
	}

	render() {
		const {
			index,
			value
		} = this.props;

		return (
			<div class="step row">
				<div class="col-sm-1">
					<label>{index + 1}{'.'}</label>
				</div>
				<div class="col-sm-11">
					<Input onInput={this.onChange_} placeholder="name" value={value} />
				</div>
			</div>
		);
	}
}

Step.PROPS = {
	index: Config.number(),
	value: Config.string()
};

class StepsInput extends Component {
	created() {
		bindAll(
			this,
			'addStep_',
			'onChange_',
			'onStepChange_'
		);
	}

	addStep_() {
		this.state.steps_ = this.state.steps_.concat(['']);

		this.onChange_();
	}

	onChange_() {
		this.props.onChange(this.state.steps_);
	}

	onStepChange_({index, value}) {
		const steps = cloneDeep(this.state.steps_);

		steps[index] = value;

		this.state.steps_ = steps;

		this.onChange_();
	}

	render() {
		const {
			steps_
		} = this.state;

		return (
			<div class="steps-input-container">
				<label>{'Steps'}</label>

				{
					steps_.map(
						(step, i) => <Step index={i} key={i} onChange={this.onStepChange_} value={step} />
					)
				}

				<Button onClick={this.addStep_}>{'Add Step'}</Button>
			</div>
		);
	}
}

StepsInput.PROPS = {
	onChange: Config.func()
};

StepsInput.STATE = {
	steps_: Config.array().value([''])
};

export default StepsInput;