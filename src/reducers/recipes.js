import {uniqueId} from 'lodash';
import {List, fromJS} from 'immutable';

import {ACTION_TYPES} from '../actions/recipes';

const testId = uniqueId();

const initialState = fromJS(
	{
		[testId]: {
			id: testId,
			title: 'Test Recipe',
			description: 'Just a test recipe',
			ingredients: [
				{
					value: 23,
					unit: 'cups',
					name: 'carrots'
				}
			],
			steps: [
				'Add some carrots',
				'Cut some onions'
			]
		}
	}
);

export default function(state = initialState, action) {
	switch(action.type) {
		case ACTION_TYPES.ADD:
			const recipe = fromJS(action.recipe);
			recipe.set('id', uniqueId())
			return state.set(recipe.get('id'), recipe);
		default:
			return state;
	}
};