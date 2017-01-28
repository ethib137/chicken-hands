import Component, {Config} from 'metal-jsx';

class Nav extends Component {
	render() {
		return (
			<nav class="navbar navbar-light bg-faded">
				<a class="navbar-brand" href="#"><img src="./src/images/logo.svg" alt="Chicken Hands" width="42" height="42"/></a>

				<ul class="nav navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#add">Add New Recipe</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;