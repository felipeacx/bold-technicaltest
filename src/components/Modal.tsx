import { FC, ReactNode, useEffect, useState } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 bg-darkGray bg-opacity-50 flex justify-end transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 shadow-2xl w-3/4 md:w-3/5 lg:w-1/2 h-full rounded-s-3xl transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <button onClick={onClose} className="text-xl font-bold">
            x
          </button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
