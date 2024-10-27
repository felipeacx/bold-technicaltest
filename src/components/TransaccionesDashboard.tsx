import { FC } from "react"
import { TransactionProps } from "../pages/Home.tsx"
import { toDateTime } from "../utils/utils.tsx"
import { IoIosLink } from "react-icons/io"

interface TransaccionesDashboardProps {
  openModal: () => void
  data: TransactionProps[] | []
  setTransaction: (row: TransactionProps) => void
}

const TransaccionesDashboard: FC<TransaccionesDashboardProps> = ({
  openModal,
  data,
  setTransaction,
}) => {
  return (
    <table className="w-full min-w-[620px]">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th>Transacción</th>
          <th>Fecha y hora</th>
          <th>Método de pago</th>
          <th>ID transacción Bold</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 ? (
          data.map((row: TransactionProps, index: number) => {
            return (
              <tr
                className={
                  "cursor-pointer border-b-2 " +
                  (index % 2 === 0 ? "border-l-4 border-l-primary" : "border-l-4 border-l-darkGray")
                }
                onClick={() => {
                  openModal()
                  setTransaction(row)
                }}
                key={row.id}
              >
                <td className="text-primary font-bold flex gap-4 items-end ml-3">
                  {row.status === "SUCCESSFUL" ? (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/cobroexitoso.png?alt=media&token=3e60d46b-712a-42c9-a914-42c462462f94"
                      alt="Exitoso"
                    />
                  ) : (
                    <IoIosLink className="size-6" />
                  )}
                  {row.status === "SUCCESSFUL" ? (
                    <span>Cobro exitoso</span>
                  ) : (
                    <span>Cobro no realizado</span>
                  )}
                </td>
                <td>{toDateTime(row.createdAt)}</td>
                <td className="flex items-center gap-4">
                  {row.paymentMethod === "BANCOLOMBIA" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/bancolombia.jpg?alt=media&token=a461b6f9-5dd2-4b5c-bfc5-2a6485ed8bd9"
                      alt="Bancolombia"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "DAVIPLATA" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/davi.jpg?alt=media&token=75bc86ba-b5d2-4784-b6fd-1683f999e851"
                      alt="Daviplata"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "NEQUI" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/nequi.jpg?alt=media&token=01d33508-dbfb-407c-a6ed-c2ae899c8725"
                      alt="Nequi"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "PSE" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/pse.jpg?alt=media&token=79a328af-da31-481a-9a76-56a0dd222c0b"
                      alt="PSE"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "CARD" && row.franchise === "MASTERCARD" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/master.jpg?alt=media&token=fa8a87c0-7959-4c5c-ad24-7b0715b0eb2a"
                      alt="MASTERCARD"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "CARD" && row.franchise === "VISA" && (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/visa.jpg?alt=media&token=2c42c120-66dd-48b7-8653-60645a7b7362"
                      alt="VISA"
                      className="size-10"
                    />
                  )}
                  <span>*** {row.transactionReference}</span>
                </td>
                <td>
                  <span>{row.id}</span>
                </td>
                <td className="text-primary font-bold flex flex-col justify-center">
                  <span>
                    {row.amount.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  {row.status === "SUCCESSFUL" && row.deduction && (
                    <>
                      <span className="text-darkGray">Deducción Bold</span>
                      <span className="text-red-500">
                        -
                        {row.deduction?.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </>
                  )}
                </td>
              </tr>
            )
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <span>No se encontraron transacciones.</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default TransaccionesDashboard
