import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getStaffById, updateStaff } from '../api/staffApi'

const initialFormData = {
  staffName: '',
  departmentId: '',
  positionId: '',
  email: '',
  loginId: '',
  loginPassword: '',
}

function StaffEditPage() {
  const { staffId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [validationErrors, setValidationErrors] = useState({})
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isCancelled = false

    async function loadStaff() {
      try {
        const staff = await getStaffById(staffId)

        if (!isCancelled) {
          setFormData({
            staffName: staff.staffName ?? '',
            departmentId: staff.departmentId ?? '',
            positionId: staff.positionId ?? '',
            email: staff.email ?? '',
            loginId: staff.loginId ?? '',
            loginPassword: '',
          })
        }
      } catch (error) {
        if (!isCancelled) {
          setApiErrorMessage(error.message)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStaff()

    return () => {
      isCancelled = true
    }
  }, [staffId, reloadCount])

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
      await updateStaff(staffId, formData)
      navigate(`/staff/${staffId}`)
    } catch (error) {
      setApiErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleRetry() {
    setApiErrorMessage('')
    setIsLoading(true)
    setReloadCount((count) => count + 1)
  }

  if (isLoading) {
    return <p>読み込み中...</p>
  }

  if (apiErrorMessage) {
    return (
      <section>
        <h1>スタッフ編集</h1>
        <p role="alert">{apiErrorMessage}</p>
        <button type="button" onClick={handleRetry}>
          再読み込み
        </button>
        <p>
          <Link to={`/staff/${staffId}`}>詳細へ戻る</Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <div className="page-heading">
        <h1>スタッフ編集</h1>
        <Link to={`/staff/${staffId}`}>詳細へ戻る</Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>スタッフID</label>
          <p>{staffId}</p>
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
          <p>変更の有無にかかわらず入力してください。</p>
          {validationErrors.loginPassword && (
            <p role="alert">{validationErrors.loginPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '更新中...' : '更新する'}
        </button>
      </form>
    </section>
  )
}

export default StaffEditPage