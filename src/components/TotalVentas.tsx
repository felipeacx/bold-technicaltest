import { BsInfoCircle } from "react-icons/bs"
import Tooltip from "./Tooltip"
import { FC } from "react"
import { getActualMonth, getDay, getMonth, getWeek } from "../utils/utils"

interface TotalVentasProps {
  filter: number
  total: number
  yearTransactions: string
  filter2: number
}

const TotalVentas: FC<TotalVentasProps> = ({ filter, total, yearTransactions, filter2 }) => {
  return (
    <div className="border rounded-xl shadow-lg sm:h-40 h-48 flex flex-col items-center gap-5 bg-white max-w-96">
      <div className="bg-gradient text-white p-4 flex items-center justify-between rounded-t-xl w-full">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis hover:overflow-visible">
          Total de ventas{" "}
          {filter === 1
            ? "de Hoy"
            : filter === 2
            ? "de Esta semana"
            : filter === 3
            ? "de " + getActualMonth()
            : "totales"}
          {filter2 === 1 ? " con datáfono" : filter2 === 2 && " con link de pago"}
        </p>
        <Tooltip text="Estas son tus ventas totales">
          <BsInfoCircle className="cursor-pointer" />
        </Tooltip>
      </div>
      <span className="text-secondary font-bold text-lg">
        {total.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          maximumFractionDigits: 0,
        })}
      </span>
      <span className="text-xs">
        {filter === 1
          ? getDay()
          : filter === 2
          ? getWeek()
          : filter === 3
          ? getMonth()
          : yearTransactions}
      </span>
    </div>
  )
}

export default TotalVentas
