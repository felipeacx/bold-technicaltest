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
                    <img src="/public/assets/img/cobroexitoso.png" alt="Exitoso" />
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
                      src="/public/assets/img/bancolombia.jpg"
                      alt="Bancolombia"
                      className="size-10"
                    />
                  )}
                  {row.paymentMethod === "DAVIPLATA" && (
                    <img src="/public/assets/img/davi.jpg" alt="Daviplata" className="size-10" />
                  )}
                  {row.paymentMethod === "NEQUI" && (
                    <img src="/public/assets/img/nequi.jpg" alt="Nequi" className="size-10" />
                  )}
                  {row.paymentMethod === "PSE" && (
                    <img src="/public/assets/img/pse.jpg" alt="PSE" className="size-10" />
                  )}
                  {row.paymentMethod === "CARD" && row.franchise === "MASTERCARD" && (
                    <img src="/public/assets/img/master.jpg" alt="MASTERCARD" className="size-10" />
                  )}
                  {row.paymentMethod === "CARD" && row.franchise === "VISA" && (
                    <img src="/public/assets/img/visa.jpg" alt="VISA" className="size-10" />
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
