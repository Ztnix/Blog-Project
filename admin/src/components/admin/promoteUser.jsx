import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import ContainerLoadingSpinner from "../ui/containerLoadingSpinner";
import { useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */

export default function PromoteUser({ onClose, onNavigate }) {
  const [msg, setMsg] = useState(null);
  const { isMasterAdmin } = useAuth();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadUsers() {
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/admin/getAllUsers`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setUsers(null);
        setLoading(false);
        setMsg(data?.errors || data?.error || "Could not fetch users");
        return;
      }
      setUsers(data.users);
    } catch (e) {
      console.log(e);
      setUsers(null);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function changeUserRole(id, roleToChange) {
    setMsg(null);
    try {
      const payload = { id, roleToChange };
      const res = await fetch(`http://localhost:3000/admin/changeUserRole`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.errors || data?.error || "Could not fetch users");
        return;
      }
      await loadUsers();
    } catch (e) {
      console.log(e);
      setMsg("Network error");
    }
  }

  if (loading) return <ContainerLoadingSpinner></ContainerLoadingSpinner>;

  return (
    <>
      {isMasterAdmin ? (
        <div className="userPromoteContainer flex flex-col gap-4">
          <button
            className="px-2 py-1 text-sm bg-gray-600 rounded w-fit bg-linear-to-t from-blue-700 to-blue-500"
            onClick={() => onNavigate(null)}
          >
            Go back
          </button>
          <div className="userList w-full flex flex-col gap-4">
            {users &&
              users.map((user, i) => (
                <div
                  className="user flex flex-1 justify-between gap-4  border border-gray-600 items-stretch divide-x divide-gray-600 "
                  key={i}
                >
                  <div className="username flex-1 flex justify-center  items-center  py-4">
                    {user.username}
                  </div>
                  <div className="roleContainer flex flex-1 gap-4 justify-center items-center  py-4">
                    <div className="role flex-1 text-center">
                      {user.roles.some((r) => r.name === "MasterAdmin")
                        ? "Master Admin"
                        : user.roles.some((r) => r.name === "Admin")
                        ? "Admin"
                        : "Member"}
                    </div>
                  </div>
                  <div className="promoteUserBtn flex-1 flex justify-center  items-center py-4">
                    {user.roles.some((obj) =>
                      obj.name.includes("MasterAdmin")
                    ) ? (
                      <div>
                        <p className=" pb-2">Can't Change</p>
                      </div>
                    ) : user.roles.some((r) => r.name.includes("Admin")) ? (
                      <div>
                        <p className=" pb-2">Already Admin</p>
                        <button
                          className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                          onClick={() => changeUserRole(user.id, "Admin")}
                        >
                          Downgrade
                        </button>
                      </div>
                    ) : (
                      <button
                        className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                        onClick={() => changeUserRole(user.id, "Admin")}
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="notAdmin">
          <h1>FORBIDDEN</h1>
        </div>
      )}
    </>
  );
}
