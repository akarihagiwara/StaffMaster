import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createStaff } from '../api/staffApi'

const initialFormData = {
  staffId: '',
  staffName: '',
  departmentId: '',
  positionId: '',
  email: '',
  loginId: '',
  loginPassword: '',
}

function StaffCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [validationErrors, setValidationErrors] = useState({})
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  function validate() {
    const errors = {}

    if (!formData.staffId.trim()) {
      errors.staffId = 'スタッフIDを入力してください。'
    }

    if (!formData.staffName.trim()) {
      errors.staffName = 'スタッフ名を入力してください。'
    }

    if (!formData.loginId.trim()) {
      errors.loginId = 'ログインIDを入力してください。'
    }

    if (!formData.loginPassword.trim()) {
      errors.loginPassword = 'ログインパスワードを入力してください。'
    }

    return errors
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const errors = validate()

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setApiErrorMessage('')
    setIsSubmitting(true)

    try {
      await createStaff(formData)
      navigate('/staff')
    } catch (error) {
      setApiErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <h1>スタッフ登録</h1>
        <Link to="/staff">一覧へ戻る</Link>
      </div>

      {apiErrorMessage && (
        <p role="alert">{apiErrorMessage}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="staffId">スタッフID *</label>
          <input
            id="staffId"
            name="staffId"
            type="text"
            value={formData.staffId}
            onChange={handleChange}
          />
          {validationErrors.staffId && (
            <p role="alert">{validationErrors.staffId}</p>
          )}
        </div>

        <div>
          <label htmlFor="staffName">スタッフ名 *</label>
          <input
            id="staffName"
            name="staffName"
            type="text"
            value={formData.staffName}
            onChange={handleChange}
          />
          {validationErrors.staffName && (
            <p role="alert">{validationErrors.staffName}</p>
          )}
        </div>

        <div>
          <label htmlFor="departmentId">部署ID</label>
          <input
            id="departmentId"
            name="departmentId"
            type="text"
            value={formData.departmentId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="positionId">役職ID</label>
          <input
            id="positionId"
            name="positionId"
            type="text"
            value={formData.positionId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="loginId">ログインID *</label>
          <input
            id="loginId"
            name="loginId"
            type="text"
            value={formData.loginId}
            onChange={handleChange}
          />
          {validationErrors.loginId && (
            <p role="alert">{validationErrors.loginId}</p>
          )}
        </div>

        <div>
          <label htmlFor="loginPassword">ログインパスワード *</label>
          <input
            id="loginPassword"
            name="loginPassword"
            type="password"
            value={formData.loginPassword}
            onChange={handleChange}
          />
          {validationErrors.loginPassword && (
            <p role="alert">{validationErrors.loginPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録する'}
        </button>
      </form>
    </section>
  )
}

export default StaffCreatePage