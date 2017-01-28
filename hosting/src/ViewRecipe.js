import Component, {Config} from 'metal-jsx';
import getCN from 'classnames';
import {bindAll, isBoolean} from 'lodash';
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
			'decreaseFontSize',
			'increaseFontSize',
			'handleNext',
			'handlePrev',
			'toggleMaximized',
			'toggleShowIngredients'
		);

		this.voiceControl_ = new VoiceControl(['chicken hands', 'chicken hand', 'chicken ands', 'chicken and']);

		this.voiceControl_.onlisteningchange = this.handleOnListeningChange.bind(this);
		this.voiceControl_.oncommand = this.handleOnCommand.bind(this);
	}

	handleOnCommand(event) {
		let action = event.action;

		if (action === ACTIONS.DECREASE_FONT) {
			this.decreaseFontSize();
		}
		else if (action === ACTIONS.INCREASE_FONT) {
			this.increaseFontSize();
		}
		else if (action === ACTIONS.INGREDIENT) {
			this.toggleShowIngredients();
		}
		else if (action === ACTIONS.MAXIMIZE) {
			this.toggleMaximized(true);
		}
		else if (action === ACTIONS.MINIMIZE) {
			this.toggleMaximized(false);
		}
		else if (action === ACTIONS.NAVIGATE_BACK) {
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

	decreaseFontSize() {
		this.state.baseFontSize_ = this.state.baseFontSize_ - 5;
	}

	increaseFontSize() {
		this.state.baseFontSize_ = this.state.baseFontSize_ + 5;
	}

	toggleMaximized(maximized) {
		if (!isBoolean(maximized)) {
			maximized = !this.state.maximized_;
		}

		this.state.maximized_ = maximized;
	}

	toggleShowIngredients() {
		this.state.showIngredients_ = !this.state.showIngredients_;
	}

	render() {
		const {baseFontSize_, maximized_} = this.state;

		const recipe = this.props.recipe.toJS();

		const stepCount = recipe.steps.length;

		const ingredientsCount = recipe.ingredients.length;

		const {currentStep} = recipe;

		const classnames = getCN('recipe-viewer panel panel-default',
			{
				maximized: this.state.maximized_
			}
		);

		const counterStyle = {
			fontSize: baseFontSize_ * 1.5 + 'px'
		};

		const stepStyle = {
			fontSize: baseFontSize_ * 2 + 'px'
		};

		const readyToListen = this.state.readyToListen_;

		const listeningStateText = readyToListen ? 'Ready to listen' : 'Processing command...';
		const listeningStateClass = readyToListen ? 'ready' : 'not-ready';

		const listeningStateClassNames = getCN('listening-state',
			{
				ready: readyToListen,
				['not-ready']: !readyToListen
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

							{maximized_ &&
								<a href="javascript:;" onClick={this.toggleMaximized}>
									<span class="glyphicon glyphicon-zoom-out"></span>
								</a>
							}

							<div class="step-counter" style={maximized_ ? counterStyle : ''}>
								<div class="btn-group" role="group" aria-label="...">
									<Button disabled={currentStep === 0} onClick={this.handlePrev}>Prev</Button>
									<Button disabled={currentStep === stepCount - 1} onClick={this.handleNext}>Next</Button>
								</div>

								<div class="step-label">{`Step ${currentStep + 1} of ${recipe.steps.length}`}</div>
							</div>

							<p class="current-step"  style={maximized_ ? stepStyle : ''}>{recipe.steps[recipe.currentStep]}</p>
						</div>

						<div class="ingredient-list panel-footer">
							{!!ingredientsCount &&
								<a href="javascript:;" onClick={this.toggleShowIngredients}>
									{this.state.showIngredients_ ? 'Hide Ingredients' : 'Show Ingredients'}
								</a>
							}

							{!!ingredientsCount && this.state.showIngredients_ &&
								<ul>
									{recipe.ingredients.map(
										({value = "0", unit, name}) => <li>
											{`${value} ${name}`}
										</li>
									)}
								</ul>
							}

						</div>
					</div>
				}

				<div class={listeningStateClassNames}>{listeningStateText}</div>
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
	baseFontSize_: Config.number().value(40),
	readyToListen_:  Config.bool().value(true),
	showIngredients_: Config.bool().value(false),
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