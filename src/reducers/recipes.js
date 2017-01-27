import {uniqueId} from 'lodash';
import {List, fromJS} from 'immutable';

import {ACTION_TYPES} from '../actions/recipes';

const testId = uniqueId();

const initialState = fromJS(
	{
		[testId]: {
			id: testId,
			title: 'Grandma\'s Chicken Chardon',
			description: 'Delicious chicken coated in bread crumbs and Parmesan cheese. Sooo easy but your guests will never know how hard you didn\'t work!',
			ingredients: [
				{
					value: '8',
					unit: '',
					name: 'skinless, boneless chicken breast halves'
				},
				{	value: '1',
					unit: '',
					name: 'egg'
				},
				{	value: '',
					unit: '',
					name: 'salt and pepper to taste'
				},
				{	value: '2',
					unit: 'tsp',
					name: 'garlic powder, divided'
				},
				{	value: '1',
					unit: 'cup',
					name: 'bread crumbs'
				},
				{	value: '1/2',
					unit: 'cup',
					name: 'grated Parmesan cheese'
				},
				{	value: '1',
					unit: 'pound',
					name: 'sliced fresh mushrooms'
				},
				{	value: '1/4',
					unit: 'cup',
					name: 'butter, melted'
				},
				{	value: '1',
					unit: 'tbsp',
					name: 'fresh lemon juice'
				},
				{	value: '1',
					unit: 'tsp',
					name: 'chopped fresh parsley'
				}
			],
			steps: [
				'Preheat the oven to 375 degrees F (190 degrees C).',
				'In a shallow bowl, beat the egg with salt, pepper and 1 teaspoon garlic powder.',
				'In a separate dish, mix bread crumbs with 1 teaspoon of garlic powder and Parmesan cheese. Set aside.',
				'Mix together the melted butter and lemon juice. Pour about 2/3 of the butter mixture into the bottom of a 9x13 inch baking dish. Tilt pan to coat the bottom.',
				'Spread mushrooms in an even layer in the bottom of the dish.',
				'Dip each chicken breast into the egg mixture, then into the bread crumb mixture. Place on top of the mushrooms.',
				'Drizzle remaining butter over the chicken, and sprinkle with parsley.',
				'Bake uncovered for 45 minutes in the preheated oven, until chicken is golden brown and juices run clear.'
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