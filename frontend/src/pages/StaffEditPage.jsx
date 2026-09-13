import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteStaff,
  getStaffById,
  updateStaff,
} from "../api/staffApi";

const initialFormData = {
  staffName: "",
  departmentId: "",
  positionId: "",
  email: "",
  loginId: "",
  loginPassword: "",
};

function StaffEditPage() {
  const { staffId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    let isCancelled = false;

    async function loadStaff() {
      try {
        const staff = await getStaffById(staffId);

        if (!isCancelled) {
          setFormData({
            staffName: staff.staffName ?? "",
            departmentId: staff.departmentId ?? "",
            positionId: staff.positionId ?? "",
            email: staff.email ?? "",
            loginId: staff.loginId ?? "",
            loginPassword: "",
          });
        }
      } catch (error) {
        if (!isCancelled) {
          setApiErrorMessage(error.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadStaff();

    return () => {
      isCancelled = true;
    };
  }, [staffId, reloadCount]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setValidationErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }
  async function handleDelete() {
    const confirmed = window.confirm(
      "このスタッフ情報を削除します。よろしいですか？",
    );

    if (!confirmed) {
      return;
    }

    setDeleteErrorMessage("");
    setIsDeleting(true);

    try {
      await deleteStaff(staffId);
      navigate("/staff");
    } catch (error) {
      setDeleteErrorMessage(error.message);
    } finally {
      setIsDeleting(false);
    }
  }
  function validate() {
    const errors = {};

    if (!formData.staffName.trim()) {
      errors.staffName = "スタッフ名を入力してください。";
    }

    if (!formData.loginId.trim()) {
      errors.loginId = "ログインIDを入力してください。";
    }

    if (!formData.loginPassword.trim()) {
      errors.loginPassword = "ログインパスワードを入力してください。";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setApiErrorMessage("");
    setIsSubmitting(true);

    try {
      await updateStaff(staffId, formData);
      navigate("/staff");
    } catch (error) {
      setApiErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRetry() {
    setApiErrorMessage("");
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  if (isLoading) {
    return <p>読み込み中...</p>;
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
        {deleteErrorMessage && (
          <p className="staff-form-error" role="alert">
            {deleteErrorMessage}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="staff-create-page">
      <h1 className="staff-create-title">スタッフ情報</h1>

      <Link to="/staff" className="staff-create-back">
        戻る
      </Link>

      {Object.values(validationErrors).filter(Boolean).length > 0 && (
        <p className="staff-form-error" role="alert">
          {Object.values(validationErrors).filter(Boolean).join(" ")}
        </p>
      )}

      <form className="staff-create-form" onSubmit={handleSubmit} noValidate>
        <table className="staff-form-table">
          <colgroup>
            <col className="staff-form-label-column" />
            <col className="staff-form-input-column" />
            <col className="staff-form-blank-column" />
          </colgroup>

          <tbody>
            <tr>
              <th>コード</th>
              <td>
                <p className="staff-form-code">{staffId}</p>
              </td>
              <td rowSpan="7" className="staff-form-blank-cell" />
            </tr>

            <tr>
              <th>
                <label htmlFor="staffName">名前 *</label>
              </th>
              <td>
                <input
                  id="staffName"
                  name="staffName"
                  type="text"
                  value={formData.staffName}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="departmentId">部署コード</label>
              </th>
              <td>
                <input
                  id="departmentId"
                  name="departmentId"
                  type="text"
                  value={formData.departmentId}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="positionId">役職コード</label>
              </th>
              <td>
                <input
                  id="positionId"
                  name="positionId"
                  type="text"
                  value={formData.positionId}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="email">email</label>
              </th>
              <td>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="loginId">ログインID *</label>
              </th>
              <td>
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  value={formData.loginId}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="loginPassword">ログインパスワード *</label>
              </th>
              <td>
                <input
                  id="loginPassword"
                  name="loginPassword"
                  type="password"
                  value={formData.loginPassword}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="staff-create-actions">
          <button type="submit" disabled={isSubmitting || isDeleting}>
            {isSubmitting ? "更新中..." : "更新"}
          </button>

          <button
            className="staff-delete-button"
            type="button"
            onClick={handleDelete}
            disabled={isSubmitting || isDeleting}
          >
            {isDeleting ? "削除中..." : "削除"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default StaffEditPage;
