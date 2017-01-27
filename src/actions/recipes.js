export const ACTION_TYPES = {
	ADD: 'ADD'
};

export function addRecipe(recipe) {
	return {
		recipe,
		type: ACTION_TYPES.ADD
	};
}