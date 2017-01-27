import {connect} from 'metal-redux';

import Component, {Config} from 'metal-jsx';

class ViewRecipe extends Component {
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
					</div>
				}
			</div>
		)
	}
}

ViewRecipe.PROPS = {
	recipe: Config.object(),
	router: Config.object()
};

export default connect(
	(state, props) => (
		{
			recipe: state.getIn(['recipes', props.router.id])
		}
	)
)(ViewRecipe);