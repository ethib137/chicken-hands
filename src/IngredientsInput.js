import Component, {Config} from 'metal-jsx';

import {bindAll, cloneDeep} from 'lodash';

import Input from './Input';
import Button from './Button';

class Ingredient extends Component {
	created() {
		bindAll(
			this,
			'onNameChange_',
			'onUnitChange_',
			'onValueChange_'
		);
	}

	onNameChange_({target}) {
		this.props.onChange(
			{
				index: this.props.index,
				type: 'name',
				value: target.value
			}
		);
	}

	onUnitChange_({target}) {
		this.props.onChange(
			{
				index: this.props.index,
				type: 'unit',
				value: target.value
			}
		);
	}

	onValueChange_({target}) {
		this.props.onChange(
			{
				index: this.props.index,
				type: 'value',
				value: target.value
			}
		);
	}

	render() {
		const {
			index,
			name,
			unit,
			value
		} = this.props;

		return (
			<div class="row">
				<div class="col-sm-1">
					<label>{index + 1}{'.'}</label>
				</div>
				<div class="col-sm-2">
					<Input onInput={this.onValueChange_} placeholder="value" value={value} />
				</div>
				<div class="col-sm-2">
					<Input onInput={this.onUnitChange_} placeholder="unit" value={unit} />
				</div>
				<div class="col-sm-7">
					<Input onInput={this.onNameChange_} placeholder="name" value={name} />
				</div>
			</div>
		);
	}
}

Ingredient.PROPS = {
	index: Config.number(),
	name: Config.string(),
	onChange: Config.func(),
	unit: Config.string(), 
	value: Config.string()
};

const EMPTY_INGREDIENT = {
	name: '',
	unit: '', 
	value: '0'
};

class IngredientsInput extends Component {
	created() {
		bindAll(
			this,
			'addIngredient_',
			'onChange_',
			'onIngredientChange_'
		);
	}

	addIngredient_() {
		this.state.ingredients_ = this.state.ingredients_.concat([EMPTY_INGREDIENT]);

		this.onChange_();
	}

	onChange_() {
		this.props.onChange(this.state.steps_);
	}

	onIngredientChange_({index, type, value}) {
		const ingredients = cloneDeep(this.state.ingredients_);

		ingredients[index][type] = value;

		this.state.ingredients_ = ingredients;

		this.onChange_();
	}

	render() {
		const {ingredients_} = this.state;

		return (
			<div class="ingredients-list-container">
				<label>{'Ingredients'}</label>

				{
					ingredients_.map(
						(ingredient, i) => <Ingredient {...ingredient} index={i} key={ingredient.name} onChange={this.onIngredientChange_} />
					)
				}

				<Button onClick={this.addIngredient_}>{'Add Ingredient'}</Button>
			</div>
		);
	}
}

IngredientsInput.PROPS = {
	onChange: Config.func()
};

IngredientsInput.STATE = {
	ingredients_: Config.array().value([EMPTY_INGREDIENT])
};

export default IngredientsInput;