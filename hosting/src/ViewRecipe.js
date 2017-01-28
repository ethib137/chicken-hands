import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';
import {bindAll} from 'lodash';
import {connect} from 'metal-redux';

import './styles/view-recipe.css';
import Button from './Button';
import VoiceControl from './lib/VoiceControl';
import {nextStep, prevStep} from './actions/recipes';

import {ACTIONS} from './lib/commandUtil';

class ViewRecipe extends Component {
	created() {
		bindAll(
			this,
			'handleNext',
			'handlePrev',
			'toggleMaximized'
		);

		this.voiceControl_ = new VoiceControl(['chicken hands', 'chicken hand', 'chicken ands', 'chicken and']);

		this.voiceControl_.onlisteningchange = this.handleOnListeningChange.bind(this);
		this.voiceControl_.oncommand = this.handleOnCommand.bind(this);
	}

	handleOnCommand(event) {
		let action = event.action;

		if (action === ACTIONS.NAVIGATE_BACK) {
			this.handlePrev();
		}
		else if (action === ACTIONS.NAVIGATE_FORWARD) {
			this.handleNext();
		}
		else if (action === ACTIONS.READ) {
			this.handleRead();
		}
	}

	handleOnListeningChange(event) {
		this.state.readyToListen_ = event.readyToListen;
	}

	handleNext() {
		this.props.nextStep(this.props.router.id);
	}

	handlePrev() {
		this.props.prevStep(this.props.router.id);
	}

	handleRead() {
		const recipe = this.props.recipe.toJS();
		const instructions = recipe.steps[recipe.currentStep];

		this.voiceControl_.speak(instructions);
	}

	toggleMaximized() {
		this.state.maximized_ = !this.state.maximized_;
	}

	render() {
		const recipe = this.props.recipe.toJS();

		const stepCount = recipe.steps.length;

		const {currentStep} = recipe;

		const classnames = getCN('recipe-viewer panel panel-default',
			{
				maximized: this.state.maximized_
			}
		);

		return (
			<div class="view-recipe-container">
				{!recipe &&
					<h2>Recipe not found!</h2>
				}

				{recipe &&
					<div class={classnames}>
						<div class="panel-heading">
							<div class="view-header">
								<h1>{recipe.title}</h1>
								<a href="javascript:;" onClick={this.toggleMaximized}>
									<span class="glyphicon glyphicon-zoom-in"></span>
								</a>
							</div>

							<div class="description">
								<p>{recipe.description}</p>
							</div>
						</div>

						<div class="panel-body">

							{this.state.maximized_ &&
								<a href="javascript:;" onClick={this.toggleMaximized}>
									<span class="glyphicon glyphicon-zoom-out"></span>
								</a>
							}

							<div class="step-counter">
								<div class="btn-group" role="group" aria-label="...">
									<Button disabled={currentStep === 0} onClick={this.handlePrev}>Prev</Button>
									<Button disabled={currentStep === stepCount - 1} onClick={this.handleNext}>Next</Button>
								</div>

								<div class="step-label">{`Step ${currentStep + 1} of ${recipe.steps.length}`}</div>
							</div>

							<p class="current-step">{recipe.steps[recipe.currentStep]}</p>
						</div>

						<div class="listening-state">{this.state.readyToListen_ ? 'Ready to listen' : 'Processing command...'}</div>
					</div>
				}
			</div>
		)
	}
}

ViewRecipe.PROPS = {
	nextStep: Config.func(),
	prevStep: Config.func(),
	recipe: Config.object(),
	router: Config.object()
};

ViewRecipe.STATE = {
	readyToListen_:  Config.bool().value(true),
	maximized_: Config.bool().value(false)
}

export default connect(
	(state, props) => (
		{
			recipe: state.getIn(['recipes', props.router.id])
		}
	),
	{
		nextStep,
		prevStep
	}
)(ViewRecipe);