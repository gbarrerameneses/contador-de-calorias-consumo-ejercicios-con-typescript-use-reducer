import { Activity } from "../types"

// Describe lo que va a pasar en el reducer activityReducer
export type ActivityActions = // Los Actions consta de dos partes, el type y el payload
    { type: 'save-activity', payload: { newActivity: Activity } }

type ActivityState = {
    activities: Activity[]
}

// State Inicial
export const initialState: ActivityState = {
    activities: []
}

// reducer que conecta a ambos, debemos pasar el state y las actions
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        // Este código maneja la logica para actualizar el state
        console.log('desde el type de save-activity');
    }

}