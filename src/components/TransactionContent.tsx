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
                  src="/public/assets/img/bancolombia.jpg"
                  alt="Bancolombia"
                  className="size-10"
                />
              )}
              {transaction?.paymentMethod === "DAVIPLATA" && (
                <img src="/public/assets/img/davi.jpg" alt="Daviplata" className="size-10" />
              )}
              {transaction?.paymentMethod === "NEQUI" && (
                <img src="/public/assets/img/nequi.jpg" alt="Nequi" className="size-10" />
              )}
              {transaction?.paymentMethod === "PSE" && (
                <img src="/public/assets/img/pse.jpg" alt="PSE" className="size-10" />
              )}
              {transaction?.paymentMethod === "CARD" && transaction?.franchise === "MASTERCARD" && (
                <img src="/public/assets/img/master.jpg" alt="MASTERCARD" className="size-10" />
              )}
              {transaction?.paymentMethod === "CARD" && transaction?.franchise === "VISA" && (
                <img src="/public/assets/img/visa.jpg" alt="VISA" className="size-10" />
              )}
              <span>*** {transaction?.transactionReference}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Tipo de pago</span>
            {transaction?.salesType === "TERMINAL" ? (
              <div className="flex items-center gap-3">
                <img src="/public/assets/img/cobroexitoso.png" alt="Exitoso" />
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
