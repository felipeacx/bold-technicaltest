import { FC, useState } from "react"

interface TooltipProps {
  text: string
  children: React.ReactNode
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onClick={() => setIsVisible(!isVisible)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-primary bg-white rounded shadow-lg whitespace-nowrap z-50">
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
