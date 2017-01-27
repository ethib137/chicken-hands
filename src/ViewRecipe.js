import Component, {Config} from 'metal-jsx';

class ViewRecipe extends Component {
	render() {
		return <h1>View Recipe: {this.props.router.id}</h1>;
	}
}

ViewRecipe.PROPS = {
	router: Config.object()
};

export default ViewRecipe;