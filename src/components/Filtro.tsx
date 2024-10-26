import { ChangeEvent, FC, useState } from "react"
import { VscSettings } from "react-icons/vsc"

interface FiltroProps {
  filter: number
  filterByTerminal: (event: ChangeEvent<HTMLInputElement>) => void
  filterByLink: (event: ChangeEvent<HTMLInputElement>) => void
  notFilter: () => void
}

const Filtro: FC<FiltroProps> = ({ filter, filterByTerminal, filterByLink, notFilter }) => {
  const [filterOptions, showFilterOptions] = useState(false)

  const openFilterOptions = () => showFilterOptions(true)
  const closeFilterOptions = () => showFilterOptions(false)

  return (
    <div className="flex justify-end absolute right-16">
      <div
        className={`m-3 flex flex-col items-center text-primary bg-white p-2 rounded-lg shadow-lg float-end transition-all duration-500 ease-in-out transform ${
          filterOptions
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-x-[-20px] pointer-events-none"
        }`}
        style={{
          maxHeight: filterOptions ? "300px" : "0",
          overflow: "hidden",
        }}
      >
        <div className="flex justify-between w-full">
          <div></div>
          <span>Filtrar</span>
          <span onClick={closeFilterOptions} className="text-2xl -mt-3 text-black cursor-pointer">
            x
          </span>
        </div>
        <ul className="py-2">
          <li className="p-1 mr-5 hover:bg-gray-100">
            <input
              className="cursor-pointer mr-3"
              checked={filter === 1}
              onChange={filterByTerminal}
              type="checkbox"
            />
            <span>Cobro con datáfono</span>
          </li>
          <li className="p-1 mr-5 hover:bg-gray-100">
            <input
              className="cursor-pointer mr-3"
              checked={filter === 2}
              onChange={filterByLink}
              type="checkbox"
            />
            <span>Cobro con link de pago</span>
          </li>
          <li className="p-1 hover:bg-gray-100">
            <input
              className="cursor-pointer mr-3"
              checked={filter === 0}
              onChange={notFilter}
              type="checkbox"
            />
            <span>Ver todos</span>
          </li>
        </ul>
        <button
          onClick={closeFilterOptions}
          className="w-full bg-secondary text-white p-2 py-3 rounded-3xl transition-opacity hover:opacity-80 hover:scale-105"
        >
          Aplicar
        </button>
      </div>

      {!filterOptions && (
        <div
          onClick={openFilterOptions}
          className={`cursor-pointer m-3 flex items-center gap-1 text-primary font-bold bg-white p-3 rounded-lg pl-10 shadow-lg float-end transition-opacity duration-500 ease-in-out ${
            filterOptions ? "opacity-0" : "opacity-100"
          }`}
        >
          <button className="w-full">Filtrar</button>
          <VscSettings className="size-7" />
        </div>
      )}
    </div>
  )
}

export default Filtro
