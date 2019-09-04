
const initState = {
	page: 'categories-list',
	spendingList: [],
	categories: [],
	budget: null,
	oldBudget: null,
}

export const reducer = (state = initState, action) => {
	switch(action.type) {
		case 'RESTORE_STATE': {
			return action.payload;
		}

		case 'CHANGE_PAGE': {
			return {
				...state,
				page: action.payload
			}
		}

		case 'START_BUDGET': {
			return {
				...state,
				budget: action.payload,
				page: 'spending-list/categories'
			}
		}

		case 'CLOSE_BUDGET': {
			return {
				...state,
				budget: null,
			    spendingList: [],
			    oldBudget: state.budget,
			    page: 'new-budget'
			}
		}

		case 'ADD_SPENDING': {
			return {
				...state,
				spendingList: state.spendingList.concat(action.payload)
			}
		}

		case 'ADD_SPENDING': {
			return {
				...state,
				spendingList: state.spendingList.concat(action.payload)
			}
		}

		case 'REMOVE_SPENDING': {
			return {
				...state,
				spendingList: state.spendingList.filter(sp => sp.id !== action.payload)
			}
		}

		case 'ADD_CATEGORY': {
			return {
				...state,
				categories: state.categories.concat(action.payload)
			}
		}

		case 'REMOVE_CATEGORY': {
			return {
				...state,
				categories: state.categories.filter(c => c !== action.payload)
			}
		}

		default:
			return state;
	}
}

export const restoreState = (state) => ({ type: 'RESTORE_STATE', payload: state });

export const changePage = (newPage) => ({ type: 'CHANGE_PAGE', payload: newPage }); 

export const startBudget = (budget) => ({ type: 'START_BUDGET', payload: budget });

export const closeBudget = () => ({ type: 'CLOSE_BUDGET' });

export const addSpending = (newItem) => ({ type: 'ADD_SPENDING', payload: newItem })

export const removeSpending = (spending) => ({ type: 'REMOVE_SPENDING', payload: spending.id })

export const addCategory = (newCategory) => ({ type: 'ADD_CATEGORY', payload: newCategory });

export const removeCategory = (category) => ({ type: 'REMOVE_CATEGORY', payload: category });



export const selectCanEditCategoies = ({ spendingList, budget }) => spendingList.length === 0 && !budget;

export const selectCanStartBudget = ({ categories, budget }) => categories.length > 0 && !budget;

export const selectCanShowSpendingList = ({ categories, budget }) => categories.length > 0 && !!budget;
