import { FC } from "react"
import { getActualMonth } from "../utils/utils"

interface TabsProps {
  filter: number
  filterToday: () => void
  filterWeek: () => void
  filterThisMonth: () => void
}

const Tabs: FC<TabsProps> = ({ filter, filterToday, filterWeek, filterThisMonth }) => {
  return (
    <div className="bg-white text-primary mx-3 rounded-lg h-auto grid grid-cols-1 gap-2 p-2 sm:grid-cols-3 sm:h-14">
      <button
        onClick={filterToday}
        className={"rounded-3xl col-span-1" + (filter === 1 && " bg-lightGray")}
      >
        Hoy
      </button>
      <button
        onClick={filterWeek}
        className={"rounded-3xl col-span-1" + (filter === 2 && " bg-lightGray")}
      >
        Esta semana
      </button>
      <button
        onClick={filterThisMonth}
        className={"rounded-3xl col-span-1" + (filter === 3 && " bg-lightGray")}
      >
        {getActualMonth()}
      </button>
    </div>
  )
}

export default Tabs
