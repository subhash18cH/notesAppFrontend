import { IoMenu } from "react-icons/io5";
import { useMyContext } from "../store/ContextApi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const [headerToggle, setHeaderToggle] = useState(false)
  const navigate = useNavigate();
  const { token, setToken, isAdmin, setIsAdmin, setCurrentUser } = useMyContext()
  const pathName = useLocation().pathname

  const handleLogOut = () => {

    localStorage.removeItem("JWT_TOKEN")
    localStorage.removeItem("USER")
    localStorage.removeItem("CSRF_TOKEN")
    localStorage.removeItem("IS_ADMIN")

    setToken(null)
    setCurrentUser(null)
    setIsAdmin(false)

    navigate("/login")
  };

  return (
    <header className='h-[72px] z-50 bg-yellow-100 flex items-center top-0 shadow-sm sticky'>
      <nav className="px-4 sm:px-10 flex justify-between items-center h-full w-full">
        <h1 className='font-bold text-2xl text-purple-800'>NoteHub</h1>
        <ul
          className={`lg:static  absolute left-0  top-16 w-full lg:w-fit lg:px-0 sm:px-10 px-4  lg:bg-transparent bg-yellow-100 ${headerToggle ? "min-h-fit max-h-navbarHeight lg:py-0 py-4 shadow-md shadow-slate-700 lg:shadow-none" : "h-0 overflow-hidden "} lg:h-auto transition-all duration-100 font-montserrat text-textColor flex lg:flex-row flex-col lg:gap-8 gap-2`}
        >
          {token &&
            (
              <>
                <Link to={"/notes"}>
                  <li className={`${pathName === "/notes" ? "font-bold" : ""
                    } py-2 cursor-pointer text-purple-800 hover:text-purple-500`}>
                    My Notes
                  </li>
                </Link>

                <Link to={"/create-note"}>
                  <li className={`${pathName === "/create-notes" ? "font-bold" : ""
                    }py-2 cursor-pointer text-purple-800 hover:text-purple-500`}>
                    Create Note
                  </li>
                </Link>
              </>
            )}
          <Link to={"/contact"}>
            <li className={`${pathName === "/contact" ? "font-bold" : ""
              } py-2 cursor-pointer  text-purple-800 hover:text-purple-500`}>
              Contact
            </li>
          </Link>

          <Link to={"/about"}>
            <li className={`${pathName === "/about" ? "font-bold" : ""
              } py-2 cursor-pointer  text-purple-800 hover:text-purple-500`}>
              About
            </li>
          </Link>

          {token ? (
            <>

              {isAdmin && (
                <Link to={"/admin/users"}>
                  <li className={`py-2  text-purple-800 hover:text-purple-500 cursor-pointer uppercase ${pathName.startsWith("/admin") ? "font-bold" : ""
                    }`}>
                    Admin
                  </li>
                </Link>
              )}

              <button onClick={handleLogOut} className='hover:text-slate-300 w-24 bg-red-500 font-semibold rounded-md text-white'>
                Logout
              </button>
            </>
          ) :
            <Link to="/signup">
              <li className="w-24 text-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-md cursor-pointer hover:text-slate-300">
                Signup
              </li>
            </Link>
          }
        </ul>
        <span onClick={() => setHeaderToggle(!headerToggle)}
          className='lg:hidden cursor-pointer hover:text-slate-400'
        >
          {headerToggle ? (
            <RxCross2 className='text-2xl' />
          ) : <IoMenu className='text-2xl' />}

        </span>
      </nav>
    </header>

  );
}
export default Navbar;