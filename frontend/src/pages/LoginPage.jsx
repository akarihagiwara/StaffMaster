import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/staffApi";
import { useAuth } from "../contexts/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn, login: saveLogin } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/staff" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!loginId.trim()) {
      setErrorMessage("ログインIDを入力してください。");
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage("ログインパスワードを入力してください。");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const staff = await loginRequest({
        loginId,
        loginPassword,
      });

      saveLogin(staff);
      navigate("/staff");
    } catch {
      setErrorMessage("ログインIDまたはログインパスワードが正しくありません。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-heading">          
          <h1 id="login-title">スタッフ管理システム</h1>
        </header>

        {errorMessage && (
          <p className="login-error" role="alert">
            {errorMessage}
          </p>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="loginId">ログインID</label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-field">
            <label htmlFor="loginPassword">パスワード</label>
            <input
              id="loginPassword"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            className="login-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
