import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import PromoteUser from "../../components/admin/promoteUser";
import PostAuditPanel from "../../components/admin/postAuditPanel";

export default function AdminPanel() {
  const { isMasterAdmin, isAdmin } = useAuth();
  const [openTab, setOpenTab] = useState(null);

  return (
    <div className="bg-[#282429] w-full flex-1 flex border-b border-gray-600 justify-center">
      <div className="mainContainer w-[50%] flex flex-col gap-6 mb-8 mt-8 text-white">
        {isMasterAdmin ? (
          <div className="masterAdminPanel flex justify-center">
            {openTab === null ? (
              <div className="flex flex-col gap-4">
                <button
                  className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-4 py-2 rounded text-2xl font-bold"
                  onClick={() => setOpenTab("userRolePanel")}
                >
                  User Role Panel
                </button>
                <button
                  className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-4 py-2 rounded text-2xl font-bold"
                  onClick={() => setOpenTab("postAuditPanel")}
                >
                  Blog Audit Panel
                </button>
              </div>
            ) : (
              <div className="activePanel  w-full">
                {openTab === "userRolePanel" && (
                  <PromoteUser
                    onClose={() => setOpenTab(null)}
                    onNavigate={setOpenTab}
                  />
                )}
                {openTab === "postAuditPanel" && (
                  <PostAuditPanel
                    onClose={() => setOpenTab(null)}
                    onNavigate={setOpenTab}
                  />
                )}
              </div>
            )}
          </div>
        ) : isAdmin ? (
          <div className="adminPanel">
            <h1>Normal User</h1>
          </div>
        ) : (
          <div className="notAdmin">
            <h1>FORBIDDEN</h1>
          </div>
        )}
      </div>
    </div>
  );
}
