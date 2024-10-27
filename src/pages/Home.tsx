import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import TotalVentas from "../components/TotalVentas.tsx"
import Filtro from "../components/Filtro.tsx"
import Tabs from "../components/Tabs.tsx"
import Dashboard from "../components/Dashboard.tsx"
import Modal from "../components/Modal.tsx"
import TransactionContent from "../components/TransactionContent.tsx"

export const apiurl = "https://bold-fe-api.vercel.app/api"

export interface TransactionProps {
  id: string
  status: "REJECTED" | "SUCCESSFUL"
  paymentMethod: "NEQUI" | "BANCOLOMBIA" | "PSE" | "DAVIPLATA" | "CARD"
  salesType: "TERMINAL" | "PAYMENT_LINK"
  createdAt: EpochTimeStamp
  transactionReference: string
  amount: number
  deduction?: number
  franchise?: "VISA" | "MASTERCARD"
}

const Home: FC = () => {
  const [data, setData] = useState<TransactionProps[] | []>([])
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const [filteredData, setFilteredData] = useState<TransactionProps[] | []>([])
  const [filter, setFilter] = useState(Number(window.localStorage.getItem("filter")))
  const [filter2, setFilter2] = useState(Number(window.localStorage.getItem("filter2")))
  const [onSearchText, setOnSearchText] = useState<string>("")
  const [transaction, setTransaction] = useState<TransactionProps | undefined>()
  const debounceTimeout = useRef<number | undefined>(undefined)

  function loadFilter(data: TransactionProps[] | [], filter: number) {
    let filteredData
    if (filter === 1) {
      filteredData = data.filter((a: TransactionProps) => {
        const date = new Date(a.createdAt)
        const today = new Date()
        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        )
      })
    } else if (filter === 2) {
      filteredData = data.filter((a: TransactionProps) => {
        const date = new Date(a.createdAt)
        const today = new Date()
        const startOfWeek = today.getDate() - today.getDay()
        const endOfWeek = startOfWeek + 7
        const startDate = new Date(today.setDate(startOfWeek))
        const endDate = new Date(today.setDate(endOfWeek))

        return date >= startDate && date <= endDate
      })
    } else if (filter === 3) {
      filteredData = data.filter((a: TransactionProps) => {
        const date = new Date(a.createdAt)
        const today = new Date()

        return date.getMonth() === today.getMonth()
      })
    } else {
      filteredData = data
    }

    return filteredData ?? []
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(apiurl)
        if (!response?.ok) throw new Error("La respuesta de la api no fue exitosa")
        const data = await response.json()
        setData(data.data)
        let filteredData = loadFilter(data.data, filter)
        if (filter2 === 1) {
          filteredData = filteredData.filter((a: TransactionProps) => a.salesType === "TERMINAL")
        } else if (filter2 === 2) {
          filteredData = filteredData.filter(
            (a: TransactionProps) => a.salesType === "PAYMENT_LINK"
          )
        }
        setFilteredData(filteredData ?? data.data)
      } catch {
        setData([])
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function filterToday() {
    if (filter !== 1) {
      const filteredData = data.filter((a) => {
        const date = new Date(a.createdAt)
        const today = new Date()
        return (
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        )
      })
      setFilteredData(filteredData)
      setFilter(1)
      window.localStorage.setItem("filter", "1")
      window.localStorage.setItem("filter2", "0")
    } else {
      setFilter(0)
      setFilter2(0)
      setFilteredData(data)
    }
  }

  function filterWeek() {
    if (filter !== 2) {
      const filteredData = data.filter((a) => {
        const date = new Date(a.createdAt)
        const today = new Date()
        const startOfWeek = today.getDate() - today.getDay()
        const endOfWeek = startOfWeek + 7
        const startDate = new Date(today.setDate(startOfWeek))
        const endDate = new Date(today.setDate(endOfWeek))

        return date >= startDate && date <= endDate
      })
      setFilteredData(filteredData)
      setFilter(2)
      setFilter2(0)
      window.localStorage.setItem("filter", "2")
      window.localStorage.setItem("filter2", "0")
    } else {
      setFilter(0)
      setFilter2(0)
      setFilteredData(data)
    }
  }

  function filterThisMonth() {
    if (filter !== 3) {
      const filteredData = data.filter((a) => {
        const date = new Date(a.createdAt)
        const today = new Date()

        return date.getMonth() === today.getMonth()
      })
      setFilteredData(filteredData)
      setFilter(3)
      setFilter2(0)
      window.localStorage.setItem("filter", "3")
      window.localStorage.setItem("filter2", "0")
    } else {
      setFilter(0)
      setFilter2(0)
      setFilteredData(data)
    }
  }

  function filterByTerminal(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const filt = loadFilter(data, filter)
      const filtered = filt.filter((a) => a.salesType === "TERMINAL")
      setFilteredData(filtered)
      setFilter2(1)
      window.localStorage.setItem("filter2", "1")
    } else {
      setFilteredData(data)
      setFilter2(0)
      window.localStorage.setItem("filter2", "0")
    }
  }

  function filterByLink(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const filt = loadFilter(data, filter)
      const filtered = filt.filter((a) => a.salesType === "PAYMENT_LINK")
      setFilteredData(filtered)
      setFilter2(2)
      window.localStorage.setItem("filter2", "2")
    } else {
      setFilteredData(data)
      setFilter2(0)
      window.localStorage.setItem("filter2", "0")
    }
  }

  function notFilter() {
    const filt = loadFilter(data, filter)
    setFilteredData(filt)
    setFilter2(0)
  }

  // Agregar debounce para buscar automaticamente después de 1 segundo sin ingresar más valores
  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setOnSearchText(event.target.value)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = window.setTimeout(() => {
      searchTransactions()
    }, 1000)
  }

  function searchTransactions() {
    if (onSearchText) {
      const filteredData = data.filter((a) => {
        return (
          a.amount.toString().toLowerCase().includes(onSearchText) ||
          a.id.toLowerCase().includes(onSearchText.toLowerCase()) ||
          a.transactionReference.toString().toLowerCase().includes(onSearchText.toLowerCase()) ||
          a.paymentMethod.toLowerCase().includes(onSearchText.toLowerCase()) ||
          a.franchise?.toLowerCase().includes(onSearchText.toLowerCase())
        )
      })
      setFilteredData(filteredData)
      setFilter(0)
      setFilter2(0)
      window.localStorage.setItem("filter", "0")
      window.localStorage.setItem("filter2", "0")
    } else {
      setFilteredData(data)
      setFilter(0)
      setFilter2(0)
      window.localStorage.setItem("filter", "0")
      window.localStorage.setItem("filter2", "0")
    }
  }

  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (onSearchText) {
        const filteredData = data.filter((a) => {
          return (
            a.amount.toString().toLowerCase().includes(onSearchText) ||
            a.id.toLowerCase().includes(onSearchText.toLowerCase()) ||
            a.transactionReference.toString().toLowerCase().includes(onSearchText.toLowerCase()) ||
            a.paymentMethod.toLowerCase().includes(onSearchText.toLowerCase()) ||
            a.franchise?.toLowerCase().includes(onSearchText.toLowerCase())
          )
        })
        setFilteredData(filteredData)
        setFilter(0)
        setFilter2(0)
        window.localStorage.setItem("filter", "0")
        window.localStorage.setItem("filter2", "0")
      } else {
        setFilteredData(data)
        setFilter(0)
        setFilter2(0)
        window.localStorage.setItem("filter", "0")
        window.localStorage.setItem("filter2", "0")
      }
    }
  }

  function getTotal() {
    let sum = 0
    if (Array.isArray(filteredData))
      filteredData?.map((e) => {
        sum += e.amount
      })
    return sum
  }

  function yearTransactions(): string {
    if (!Array.isArray(filteredData)) {
      return ""
    }
    return [
      ...new Set(filteredData.map((element) => String(new Date(element.createdAt).getFullYear()))),
    ].join(", ")
  }

  return (
    <>
      <section className="bg-lightGray h-[90vh]">
        <div className="p-16 grid grid-cols-3 w-full pb-5">
          <div className="col-span-3 lg:col-span-1 sm:col-span-2">
            <TotalVentas
              filter={filter}
              total={getTotal()}
              yearTransactions={yearTransactions()}
              filter2={filter2}
            />
          </div>
          <div className="col-span-3 mt-4 lg:mt-0 lg:col-span-2">
            <Tabs
              filter={filter}
              filterToday={filterToday}
              filterWeek={filterWeek}
              filterThisMonth={filterThisMonth}
            />
            <Filtro
              filter={filter2}
              filterByTerminal={filterByTerminal}
              filterByLink={filterByLink}
              notFilter={notFilter}
            />
          </div>
        </div>
        <Dashboard
          openModal={openModal}
          data={filteredData}
          onSearch={onSearch}
          onKeyPress={onKeyPress}
          filter={filter}
          setTransaction={setTransaction}
          filter2={filter2}
        />
        {filteredData.length > 0 && (
          <span className="ml-16 text-darkGray text-xs">
            {filteredData.length} transacciones registradas
          </span>
        )}
      </section>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <TransactionContent transaction={transaction} />
      </Modal>
    </>
  )
}

export default Home
