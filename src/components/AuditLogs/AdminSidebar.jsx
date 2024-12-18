import { Tooltip } from "@mui/material"
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa"
import { LiaBlogSolid } from "react-icons/lia"
import { Link, useLocation } from "react-router-dom"
import { useMyContext } from "../../store/ContextApi"

const AdminSidebar = () => {
  const { openSidebar, setOpenSidebar } = useMyContext()
  const pathName = useLocation().pathname

  return (
    <div className={`bg-yellow-100 z-20 fixed top-[72px] ${openSidebar ? "w-52" : "w-12"} transition-all duration-150 min-h-[calc(100vh-74px)] max-h-[calc(100vh-74px)]`}>

      <div className='flex flex-end min-h-10 max-h-10'>
        {openSidebar ? (

          <button className='flex justify-center items-center' onClick={() => setOpenSidebar(!openSidebar)}>
            <span> <FaArrowLeft /> </span>
            <span className='font-semibold'> Close </span>
          </button>
        ) : (
          <Tooltip title="Click to expand">
            <button onClick={() => setOpenSidebar(!openSidebar)}>
              <span>
                <FaArrowRight className='text-lg' />
              </span>
            </button>
          </Tooltip>
        )
        }
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        <Tooltip title={`${openSidebar ? "" : "All Users"}`}>
          <Link to={"/admin/users"} className={`flex text-white items-center gap-2 ${pathName.startsWith("/admin/users")
            ? "bg-blue-600"
            : "bg-transparent"
            }   min-h-10 max-h-10 py-2 px-2 rounded-md hover:bg-blue-500`}>
            <span> <FaUser className='text-black' /> </span>
            <span className={`${!openSidebar ? "opacity-0" : ""} font-semibold transition-all text-black ease-in-out duration-150`}>All Users</span>
          </Link>
        </Tooltip>

        <Tooltip title={`${openSidebar ? "" : "Audit Logs"}`}>
          <Link to={"/admin/audit-logs"} className={`flex text-white items-center gap-2 ${pathName.startsWith("/admin/audit-logs")
            ? "bg-blue-600"
            : "bg-transparent"
            }   min-h-10 max-h-10 py-2 px-2 rounded-md hover:bg-blue-500`}>
            <span> <LiaBlogSolid className='text-xl text-black' /> </span>
            <span className={`${!openSidebar ? "opacity-0" : ""} font-semibold transition-all text-black ease-in-out duration-150`}>Audit Logs </span>
          </Link>
        </Tooltip>

      </div>

    </div>
  )
}

export default AdminSidebar