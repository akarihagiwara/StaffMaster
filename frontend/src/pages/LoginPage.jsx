import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { login as loginRequest } from '../api/staffApi'
import { useAuth } from '../contexts/useAuth'

function LoginPage() {
  const navigate = useNavigate()
  const { isLoggedIn, login: saveLogin } = useAuth()

  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoggedIn) {
    return <Navigate to="/staff" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!loginId.trim() || !loginPassword.trim()) {
      setErrorMessage('ログインIDとログインパスワードを入力してください。')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const staff = await loginRequest({
        loginId,
        loginPassword,
      })

      saveLogin(staff)
      navigate('/staff')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>StaffMaster ログイン</h1>

        {errorMessage && <p role="alert">{errorMessage}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="loginId">ログインID</label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="loginPassword">ログインパスワード</label>
            <input
              id="loginPassword"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage