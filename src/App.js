import "./styles/App.css";

import Component, {Config} from 'metal-jsx';
import Route from 'route-parser';

import Input from './Input';
import HashNav from './lib/HashNav';
import IndexRecipes from './IndexRecipe';
import AddRecipes from './AddRecipe';
import NotFound from './NotFound';
import ViewRecipe from './ViewRecipe';
import Nav from './Nav';

const ROUTES = [
	{
		route: new Route(''),
		component: IndexRecipes
	},
	{
		route: new Route('add'),
		component: AddRecipes
	},
	{
		route: new Route('view/:id'),
		component: ViewRecipe
	}
];

class App extends Component {
	attached() {
		this._hashNav = new HashNav({
			onHashChange: hash => this.state.hash = hash
		});
	}

	getActivePage() {
		const routeConfig = ROUTES.find(({route}) => !!route.match(this.state.hash))

		let Page;
		let pageParams;

		if (!routeConfig) {
			Page = NotFound;
			pageParams = {};
		}
		else {
			Page = routeConfig.component;
			pageParams = routeConfig.route.match(this.state.hash);
		}

		return {
			Page,
			pageParams
		};
	}

	render() {
		const {Page, pageParams} = this.getActivePage();

		return (
			<div class="container container-fluid container-lg">
				<Nav />

				<div class="row">
					<Page router={pageParams} />
				</div>
			</div>
		);
	}
}

App.STATE = {
	hash: Config.value(window.nav)
};

export default App;