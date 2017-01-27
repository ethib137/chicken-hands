import Component from 'metal-jsx';

class FormGroup extends Component {
	render() {
		return (
			<div class="form-group">
				{this.props.children}
			</div>
		);
	}
}

export default FormGroup;