import Component, {Config} from 'metal-jsx';
import {bindAll} from 'lodash';
import {connect} from 'metal-redux';

import './styles/view-recipe.css';
import Button from './Button';
import VoiceControl from './lib/VoiceControl';
import {nextStep, prevStep} from './actions/recipes';

class ViewRecipe extends Component {
	created() {
		bindAll(
			this,
			'handleNext',
			'handlePrev'
		);

		this.voiceControl_ = new VoiceControl('chicken hands');

		this.voiceControl_.onlisteningchange = this.handleOnListeningChange.bind(this);
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

	render() {
		const recipe = this.props.recipe.toJS();

		const stepCount = recipe.steps.length;

		const {currentStep} = recipe;

		return (
			<div class="view-container">
				{!recipe &&
						<h2>Recipe not found!</h2>
				}

				{recipe &&
						<div class="view-recipe-container panel panel-default">
							<div class="panel-heading">
								<h1>Title: {recipe.title}</h1>
							</div>

							<div class="panel-body">
								<h2>Description:</h2>
								<p>{recipe.description}</p>

								<h2>Current Step:</h2>
								<p class="current-step">{recipe.steps[recipe.currentStep]}</p>

								<div class="step-counter">
									<div class="btn-group" role="group" aria-label="...">
										<Button disabled={currentStep === 0} onClick={this.handlePrev}>Prev</Button>
										<Button disabled={currentStep === stepCount - 1} onClick={this.handleNext}>Next</Button>
									</div>

									<div class="step-label">{`Step ${currentStep + 1} of ${recipe.steps.length}`}</div>
								</div>

								<div>{this.state.readyToListen_ ? 'Ready to listen' : 'Processing command...'}</div>
							</div>

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
	readyToListen_:  Config.bool().value(true)
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