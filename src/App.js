import Component from 'metal-jsx';
import "./styles/App.css";

import Input from './Input';

class App extends Component {
  render() {
    return (
    	<div class="container container-fluid container-lg">
	    	<div class="row">
	    		<h1>Hello World</h1>

	    		<Input placeholder="Hello" />
	    	</div>
    	</div>
    );
  }
}

export default App;
