import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, setUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/home");
      } else {
        console.error("Logout failed", await res.text());
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  return (
    <div className="flex justify-center py-8 px-12 bg-[#282429] text-white border-b border-gray-600">
      <div className="w-3/4 flex justify-between text-[1.2rem]">
        <div className="headerLogo">LOGO HERE</div>
        <div className="flex">
          <div className="flex gap-4 px-6 border-r border-gray-600 ">
            <button className="headerOption" onClick={() => navigate("/home")}>
              Homepage
            </button>
            <button className="headerOption" onClick={() => navigate("/about")}>
              About me
            </button>
          </div>
          <div className="flex gap-4 px-6 items-center">
            {user ? (
              <>
                <div>Welcome, {user.username}</div>
                <button
                  className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                  onClick={() => navigate("/newBlog")}
                >
                  New Blog
                </button>
                {isAdmin && (
                  <button
                    className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                    onClick={() => navigate("/adminPanel")}
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="headerOption"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="headerOption bg-linear-to-t from-blue-700 to-blue-500 px-3 py-1 rounded"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
