import Component, {Config} from 'metal-jsx';
import {connect} from 'metal-redux';

class IndexRecipe extends Component {
	render() {
		const recipes = this.props.recipes.toList().toJS();

		return (
			<div class="index-container">
				{!recipes.length &&
					<h2>No Recipes created yet!</h2>
				}

				<ul>
					{!!recipes.length && recipes.map(
						recipe => <li>
							<a href={`#view/${recipe.id}`}>{recipe.title}</a>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

IndexRecipe.PROPS = {
	recipes: Config.object()
};

export default connect(
	state => {
		return {
			recipes: state.get('recipes')
		};
	}
)(IndexRecipe);