import Component, {Config} from 'metal-jsx';
import {bindAll} from 'lodash';
import {connect} from 'metal-redux';

import Button from './Button';
import FormGroup from './FormGroup';
import IngredientsInput from './IngredientsInput';
import Input from './Input';
import StepsInput from './StepsInput';
import Textarea from './Textarea';
import {addRecipe} from './actions/recipes';

class AddRecipe extends Component {
	created() {
		bindAll(
			this,
			'addRecipe_',
			'onDescriptionChange_',
			'onIngredientsChange_',
			'onStepsChange_',
			'onTitleChange_'
		);
	}

	addRecipe_() {
		const {
			description_,
			ingredients_,
			steps_,
			title_
		} = this.state;

		this.props.addRecipe(
			{
				description: description_,
				ingredients: ingredients_,
				steps: steps_,
				title: title_
			}
		);
	}

	onDescriptionChange_({target}) {
		this.state.description_ = target.value;
	}

	onIngredientsChange_(ingredients) {
		this.state.ingredients_ = ingredients;
	}

	onStepsChange_(steps) {
		this.state.steps_ = steps;
	}

	onTitleChange_({target}) {
		this.state.title_ = target.value;
	}

	render() {
		const {
			description_,
			title_
		} = this.state;

		return (
			<div class="add-recipe">
				<h1>Add Recipe</h1>

				<FormGroup>
					<label for="title">Title</label>
					<Input
						id="title"
						onInput={this.onTitleChange_}
						placeholder="Best Chicken Fajitas Ever!"
						value={title_}
					/>
				</FormGroup>

				<FormGroup>
					<label for="description">Description</label>
					<Textarea
						id="description"
						onInput={this.onDescriptionChange_}
						placeholder="We made theses in June 2011 and they were fantastic..."
						value={description_}
					/>
				</FormGroup>

				<IngredientsInput onChange={this.onIngredientsChange_} />

				<StepsInput onChange={this.onStepsChange_} />

				<Button display="primary" onClick={this.addRecipe_}>{'Add Recipe'}</Button>
			</div>
		);
	}
}

AddRecipe.STATE = {
	description_: Config.string().value(''),
	ingredients_: Config.array().value([]),
	steps_: Config.array().value([]),
	title_: Config.string().value('')
}

export default connect(
	null,
	{
		addRecipe
	}
)(AddRecipe);