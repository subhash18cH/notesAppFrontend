import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminAuditLogs from "./AdminAuditLogs";
import AuditLogsDetails from "./AuditLogsDetails";
import UserList from "./UserList";
import { useMyContext } from "../../store/ContextApi";

const Admin = () => {
  const { openSidebar } = useMyContext();
  return (
    <div className="flex">
      <AdminSidebar />
      <div
        className={`transition-all overflow-hidden flex-1 duration-150 w-full min-h-[calc(100vh-74px)] ${openSidebar ? "lg:ml-52 ml-12" : "ml-12"
          }`}
      >
        <Routes>
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="audit-logs/:noteId" element={<AuditLogsDetails />} />
          <Route path="users" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin