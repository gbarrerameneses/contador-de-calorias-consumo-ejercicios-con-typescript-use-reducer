import { categories } from "../data/categories"

export default function Formulario() {
  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg">
        {/* Categoría */}
        <div
          className="grid gri-cols-1 gap-3">
            <label
              htmlFor="category"
              className="font-bold">Categoría:</label>
            <select
              className="border border-slate-300 p-2 rounded-lg w-full bg-white"
              id="category">
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
              htmlFor="activity"
              className="font-bold">Actividad:</label>
            <input
              id="activity"
              type="text"
              className="border border-slate-300 p-2 rounded-lg"
              placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
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
            />
        </div>

        <input
          type="submit"
          value="Guardar Comida o Guardar Ejercicio"
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"/>


      </form>
  )
}
