import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MdDateRange, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import moment from "moment";
import api from "../../services/Api";

export const userListsColumns = [
  {
    field: "username",
    headerName: "UserName",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    editable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "font-normal border text-slate-700",
    renderHeader: (params) => <span>UserName</span>
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 260,
    headerAlign: "center",
    editable: false,
    disableColumnMenu: true,
    align: "center",
    headerClassName: "text-black font-semibold text-center border",
    cellClassName: "text-center font-normal border text-slate-700",
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className='flex items-center justify-center gap-1'>
          <span>
            <MdOutlineEmail className='text-lg' />
          </span>
          <span>
            {params?.row?.email}
          </span>
        </div>
      )

    }
  },
  {
    field: "createdAt",
    headerName: "Created At",
    minWidth: 230,
    headerAlign: "center",
    editable: false,
    disableColumnMenu: true,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-center font-normal border ",
    renderHeader: (params) => <span>Created At</span>,
    renderCell: (params) => {
      return (
        <div className=" flex justify-center  items-center  gap-1 ">
          <span>
            <MdDateRange className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.created}</span>
        </div>
      );
    }

  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: " font-normal border text-slate-700 ",
    renderHeader: (params) => <span className='ps-10'>Status</span>
  },
  {
    field: "action",
    headerName: "Action",
    editable: false,
    sortable: false,
    width: 200,
    headerAlign: "center",
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-center font-normal border text-slate-700",
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <Link to={``} className='flex items-center h-full justify-center'>
          <button className='px-6  h-9 rounded-md flex justify-center items-center bg-blue-600 text-white'>View</button>
        </Link>
      )
    }
  },
]

const UserList = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/getusers");
        const userData = Array.isArray(response.data) ? response.data : [];
        setUsers(userData)
      } catch (error) {
        setError(error?.response?.data?.message)
      } finally {
        setLoading(false)

      }
    }
    fetchUsers();
  }, [])

  const rows = users.map((item) => {
    const formatedDate = moment(item.createdDate).format("MMMM DD, YYYY, hh:mm A")
    return {
      id: item.userId,
      username: item.userName,
      email: item.email,
      created: formatedDate,
      status: item.enabled ? "Active" : "Inactive"
    }
  })
  return (
    <div className='py-4'>

      <div className='py-4'>
        <h1 className='text-center text-2xl font-bold text-slate-800'>All Users</h1>
      </div>

      <div className='overflow-x-auto w-full mx-auto'>
        <DataGrid
          className='w-fit mx-auto'
          rows={rows}
          columns={userListsColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[6]}
          disableColumnResize
        />
      </div>
    </div>
  )
}

export default UserList