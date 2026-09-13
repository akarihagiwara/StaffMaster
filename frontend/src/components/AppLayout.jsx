import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useState } from "react";

function AppLayout() {
  const navigate = useNavigate();
  const { currentStaff, logout } = useAuth();
  const [logoutErrorMessage, setLogoutErrorMessage] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setLogoutErrorMessage("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setLogoutErrorMessage(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <header className="app-header">
        <Link to="/staff" className="app-title">
          スタッフ管理システム
        </Link>

        <div>
          <span>{currentStaff.staffName} さん</span>{" "}
          <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "ログアウト中..." : "ログアウト"}
          </button>
          {logoutErrorMessage && <p role="alert">{logoutErrorMessage}</p>}
        </div>

     
      </header>

      <main className="app-main">
        
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
