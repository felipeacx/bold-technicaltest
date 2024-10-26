import logo from "../assets/logo.svg"
import { IoMdHelpCircleOutline } from "react-icons/io"

const Header = () => {
  return (
    <div className="flex bg-gradient items-center justify-between px-5 sm:px-10 h-20">
      <div className="flex justify-center items-center">
        <img src={logo} alt="Bold" className="w-28" />
      </div>
      <div className="flex gap-10 text-xs sm:text-base">
        <button className="text-white">Mi negocio</button>
        <button className="text-white flex gap-2 items-center justify-center mr-4 sm:mr-14">
          Ayuda <IoMdHelpCircleOutline />
        </button>
      </div>
    </div>
  )
}

export default Header
