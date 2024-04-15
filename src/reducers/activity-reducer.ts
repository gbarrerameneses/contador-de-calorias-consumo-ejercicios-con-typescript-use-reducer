import { Activity } from "../types"

// Describe lo que va a pasar en el reducer activityReducer
export type ActivityActions = // Los Actions consta de dos partes, el type y el payload
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'],
}

// revisa si tenemos algo en localStorage y ese es el valor inicial
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// State Inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// reducer que conecta a ambos, debemos pasar el state y las actions
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        // Este código maneja la logica para actualizar el state
        let updateActivities : Activity[] = []
        if(state.activeId){
            updateActivities = state.activities.map( activity => activity.id === state.activeId
                ? action.payload.newActivity
                : activity );
        } else {
            updateActivities = [...state.activities, action.payload.newActivity];
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: '' // reiniciamos después de cada llamado a la acción, para evitar que sea el mismo id y reescriba la información
        }
    }

    if(action.type === 'set-activeId'){

        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){

        return {
            ...state,
           activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activiteId: ''
        }
    }

    return state
}