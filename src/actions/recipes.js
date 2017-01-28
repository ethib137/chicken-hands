export const ACTION_TYPES = {
	ADD: 'ADD',
	NEXT_STEP: 'NEXT_STEP',
	PREV_STEP: 'PREV_STEP'
};

export function addRecipe(recipe) {
	return {
		recipe: {
			...recipe,
			currentStep: 0
		},
		type: ACTION_TYPES.ADD
	};
}

export function nextStep(id) {
	return {
		id,
		type: ACTION_TYPES.NEXT_STEP
	};
}

export function prevStep(id) {
	return {
		id,
		type: ACTION_TYPES.PREV_STEP
	};
}