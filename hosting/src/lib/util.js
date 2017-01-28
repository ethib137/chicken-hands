import {omit} from 'lodash';

export function otherProps(comp) {
	return omit(
		comp.props,
		comp.getDataManager().getPropsInstance(comp).getStateKeys(),
		'key',
		'ref'
	);
}