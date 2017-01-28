import {uniqueId} from 'lodash';
import {Map, fromJS} from 'immutable';

import {ACTION_TYPES} from '../actions/recipes';

const testId = uniqueId();

export default function(state = Map(), action) {
	switch(action.type) {
		case ACTION_TYPES.ADD:
			const recipe = fromJS(action.recipe)
				.set('id', uniqueId())
				.set('currentStep', 0);
			return state.set(recipe.get('id'), recipe);
		case ACTION_TYPES.NEXT_STEP:
			const stepCount = state.getIn([action.id, 'steps'], List()).size - 1;
			return state.updateIn(
				[action.id, 'currentStep'],
				step => Math.min(step + 1, stepCount)
			);
		case ACTION_TYPES.PREV_STEP:
			return state.updateIn(
				[action.id, 'currentStep'],
				step => Math.max(step - 1, 0)
			);
		default:
			return state;
	}
};