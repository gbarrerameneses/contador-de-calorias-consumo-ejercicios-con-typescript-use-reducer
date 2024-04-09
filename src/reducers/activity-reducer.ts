import { Activity } from "../types"

// Describe lo que va a pasar en el reducer activityReducer
export type ActivityActions = {

}

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

}