import Component, {Config} from 'metal-jsx';

class Nav extends Component {
	render() {
		return (
			<nav class="navbar navbar-light bg-faded">
				<a class="navbar-brand" href="#">Chicken Hands</a>

				<ul class="nav navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#add">Add</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#view">View</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Nav;