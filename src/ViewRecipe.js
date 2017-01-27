import Component, {Config} from 'metal-jsx';
import {bindAll} from 'lodash';
import {connect} from 'metal-redux';
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
	}

	handleNext() {
		this.props.nextStep(this.props.router.id);
	}

	handlePrev() {
		this.props.prevStep(this.props.router.id);
	}

	render() {
		const recipe = this.props.recipe.toJS();

		return (
			<div class="view-container">
				{!recipe &&
					<h2>Recipe not found!</h2>
				}

				{recipe &&
					<div>
						<h2>Title: {recipe.title}</h2>
						<h2>description: {recipe.description}</h2>

						<p>{recipe.steps[recipe.currentStep]}</p>

						<div class="btn-group" role="group" aria-label="...">
							  <button onClick={this.handlePrev} type="button" class="btn btn-default">Prev</button>
							  <button onClick={this.handleNext} type="button" class="btn btn-default">Next</button>
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