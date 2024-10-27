import { CiSearch } from "react-icons/ci"
import TransaccionesDashboard from "./TransaccionesDashboard.tsx"
import { FC } from "react"
import { TransactionProps } from "../pages/Home.tsx"
import { getActualMonth } from "../utils/utils.tsx"

interface DashboardProps {
  openModal: () => void
  data: TransactionProps[] | []
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  filter: number
  setTransaction: (row: TransactionProps) => void
  filter2: number
}

const Dashboard: FC<DashboardProps> = ({
  openModal,
  data,
  onSearch,
  onKeyPress,
  filter,
  setTransaction,
  filter2,
}) => {
  return (
    <div className="border rounded-t-xl shadow-lg bg-white m-16 mb-2 lg:mt-0 mt-24 sm:mt:14">
      <div className="bg-gradient text-white p-4 flex items-center justify-between rounded-t-xl">
        <p>
          Tus ventas{" "}
          {filter === 1
            ? "de Hoy"
            : filter === 2
            ? "de Esta semana"
            : filter === 3
            ? "de " + getActualMonth()
            : "totales"}
          {filter2 === 1 ? " con datáfono" : filter2 === 2 && " con link de pago"}
        </p>
      </div>
      <button className="flex gap-5 p-3 text-gray-400 border-b w-full">
        <CiSearch className="size-6" />
        <input
          className="w-full pl-3"
          type="text"
          onChange={onSearch}
          onKeyPress={onKeyPress}
          placeholder="Buscar"
        />
      </button>
      <div className="overflow-auto max-h-[55vh]">
        <TransaccionesDashboard openModal={openModal} data={data} setTransaction={setTransaction} />
      </div>
    </div>
  )
}

export default Dashboard
