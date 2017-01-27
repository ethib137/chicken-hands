import Component, {Config} from 'metal-jsx';
import "./styles/App.css";

import Input from './Input';
import HashNav from './lib/HashNav';
import IndexRecipes from './IndexRecipe';
import AddRecipes from './AddRecipe';
import NotFound from './NotFound';
import ViewRecipe from './ViewRecipe';
import Nav from './Nav';

const ROUTES = {
	'': IndexRecipes,
	'add': AddRecipes,
	'view': ViewRecipe
};

class App extends Component {
	attached() {
		this._hashNav = new HashNav({
			onHashChange: hash => this.state.hash = hash
		});
	}

	render() {
		const Page = ROUTES[this.state.hash] || NotFound;

		return (
			<div class="container container-fluid container-lg">
				<Nav />

				<div class="row">
					<Page />
				</div>
			</div>
		);
	}
}

App.STATE = {
	hash: Config.value(window.nav)
};

export default App;