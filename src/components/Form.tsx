import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid" // npm i uuid && npm i --save-dev @types/uuid
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityState, ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Formulario({state, dispatch}: FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  // ? Trae el id de la actividad que vamos a editar
  useEffect(() => {
    if(state.activeId){
      const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      // ? Seteamos setActivity con selectActivity
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity, // mantiene lo que ya tenemos en el State anteriormente
      [e.target.id]: isNumberField ? +e.target.value : e.target.value // + lo convierte a número
    })
  }

  // Validación button form disabled
  const isValidActivity = () => {
    const { name, calories } = activity
    // console.log(name.trim() !== '');
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ActivityActions vienen de activity-reducer.ts
    dispatch({type: 'save-activity', payload: {newActivity: activity}})
    // Seteando (reiniciando) el form
    setActivity({
      ...initialState,
      id: uuidv4() // pasamos el id nuevo
    })
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}>
        {/* Categoría */}
        <div
          className="grid gri-cols-1 gap-3">
            <label
              htmlFor="category"
              className="font-bold">Categoría:</label>
            <select
              className="border border-slate-300 p-2 rounded-lg w-full bg-white"
              id="category"
              value={activity.category}
              onChange={handleChange}
              >

                {categories.map(category => (
                  <option
                    key={category.id}
                    value={category.id}>
                    {category.name}
                  </option>
                ))}

            </select>
        </div>
        {/* Actividades */}
        <div
          className="grid gri-cols-1 gap-3">
            <label
              htmlFor="name"
              className="font-bold">Actividad:</label>
            <input
              id="name"
              type="text"
              className="border border-slate-300 p-2 rounded-lg"
              placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
              value={activity.name}
              onChange={handleChange}
            />
        </div>
        {/* Calorías */}
        <div
          className="grid gri-cols-1 gap-3">
            <label
              htmlFor="calories"
              className="font-bold">Calorías:</label>
            <input
              id="calories"
              type="number"
              className="border border-slate-300 p-2 rounded-lg"
              placeholder="Calorías. Ej. 300 0 500"
              value={activity.calories}
              onChange={handleChange}
            />
        </div>

        <input
          type="submit"
          value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
          disabled={!isValidActivity()}
          />


      </form>
  )
}
