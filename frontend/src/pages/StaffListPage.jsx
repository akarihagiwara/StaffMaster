import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStaffList } from '../api/staffApi'

function StaffListPage() {
  const [staffList, setStaffList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isCancelled = false

    async function loadStaffList() {
      try {
        const data = await getStaffList()

        if (!isCancelled) {
          setStaffList(data)
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(error.message)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStaffList()

    return () => {
      isCancelled = true
    }
  }, [reloadCount])

  function handleRetry() {
    setStaffList([])
    setErrorMessage('')
    setIsLoading(true)
    setReloadCount((count) => count + 1)
  }

  return (
    <section>
      <div className="page-heading">
        <h1>スタッフ一覧</h1>
        <Link to="/staff/new">新規登録</Link>
      </div>

      {isLoading && <p>読み込み中...</p>}

      {!isLoading && errorMessage && (
        <div>
          <p role="alert">{errorMessage}</p>
          <button type="button" onClick={handleRetry}>
            再読み込み
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && staffList.length === 0 && (
        <p>スタッフが登録されていません。</p>
      )}

      {!isLoading && !errorMessage && staffList.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>スタッフID</th>
              <th>スタッフ名</th>
              <th>部署ID</th>
              <th>役職ID</th>
              <th>メールアドレス</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.staffId}>
                <td>
                  <Link to={`/staff/${staff.staffId}`}>
                    {staff.staffId}
                  </Link>
                </td>
                <td>{staff.staffName}</td>
                <td>{staff.departmentId || '-'}</td>
                <td>{staff.positionId || '-'}</td>
                <td>{staff.email || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default StaffListPage