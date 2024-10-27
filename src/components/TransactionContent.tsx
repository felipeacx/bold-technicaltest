import { FaCheckCircle } from "react-icons/fa"
import { MdError } from "react-icons/md"
import { toDateTime } from "../utils/utils.tsx"
import { IoIosLink } from "react-icons/io"
import { FC } from "react"
import { TransactionProps } from "../pages/Home.tsx"

interface TransactionContentProps {
  transaction: TransactionProps | undefined
}

const TransactionContent: FC<TransactionContentProps> = ({ transaction }) => {
  return (
    <div>
      <div className="flex gap-1 flex-col items-center w-full">
        {transaction?.status === "SUCCESSFUL" ? (
          <>
            <FaCheckCircle className="size-8 text-green-500" />
            <span>¡Cobro exitoso!</span>
          </>
        ) : (
          <>
            <MdError className="size-8 text-red-500" />
            <span>¡Cobro no realizado!</span>
          </>
        )}
        <span className="text-primary text-2xl font-bold">
          {transaction?.amount.toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          })}
        </span>
        <span className="text-sm">{toDateTime(Number(transaction?.createdAt))}</span>
        <div className="flex justify-between gap-2 flex-col w-full">
          <div className="mt-10 flex justify-between">
            <span>ID transacción Bold</span>
            <span className="font-bold">{transaction?.id}</span>
          </div>
          {transaction?.status === "SUCCESSFUL" && transaction?.deduction && (
            <div className="flex justify-between">
              <span>Deducción Bold</span>
              <span className="font-bold text-red-500">
                -
                {transaction?.deduction.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          )}
          <hr className="border border-black w-full" />
          <div className="flex justify-between">
            <span>Método de pago</span>
            <div className="flex items-center gap-3">
              {transaction?.paymentMethod === "BANCOLOMBIA" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/bancolombia.jpg?alt=media&token=a461b6f9-5dd2-4b5c-bfc5-2a6485ed8bd9"
                  alt="Bancolombia"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "DAVIPLATA" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/davi.jpg?alt=media&token=75bc86ba-b5d2-4784-b6fd-1683f999e851"
                  alt="Daviplata"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "NEQUI" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/nequi.jpg?alt=media&token=01d33508-dbfb-407c-a6ed-c2ae899c8725"
                  alt="Nequi"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "PSE" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/pse.jpg?alt=media&token=79a328af-da31-481a-9a76-56a0dd222c0b"
                  alt="PSE"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "CARD" && transaction?.franchise === "MASTERCARD" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/master.jpg?alt=media&token=fa8a87c0-7959-4c5c-ad24-7b0715b0eb2a"
                  alt="MASTERCARD"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "CARD" && transaction?.franchise === "VISA" && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/visa.jpg?alt=media&token=2c42c120-66dd-48b7-8653-60645a7b7362"
                  alt="VISA"
                  className="size-10"
                />
              )}
              <span>*** {transaction?.transactionReference}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Tipo de pago</span>
            {transaction?.salesType === "TERMINAL" ? (
              <div className="flex items-center gap-3">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bold-technicaltest.appspot.com/o/cobroexitoso.png?alt=media&token=3e60d46b-712a-42c9-a914-42c462462f94"
                  alt="Terminal"
                />
                <span className="font-bold">Terminal</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <IoIosLink className="size-10" />
                <span className="font-bold">Link de pagos</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionContent
