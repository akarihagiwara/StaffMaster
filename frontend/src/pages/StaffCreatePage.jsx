import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createStaff } from "../api/staffApi";

const initialFormData = {
  staffId: "",
  staffName: "",
  departmentId: "",
  positionId: "",
  email: "",
  loginId: "",
  loginPassword: "",
};

function StaffCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function validate() {
    const errors = {};

    if (!formData.staffId.trim()) {
      errors.staffId = "スタッフIDを入力してください。";
    }

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
      await createStaff(formData);
      navigate("/staff");
    } catch (error) {
      setApiErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

return (
  <section className="staff-create-page">
    <h1 className="staff-create-title">スタッフ登録</h1>

    <Link to="/staff" className="staff-create-back">
      一覧に戻る
    </Link>

  {apiErrorMessage && (
  <p className="staff-form-error" role="alert">
    {apiErrorMessage}
  </p>
)}

{Object.values(validationErrors).filter(Boolean).length > 0 && (
  <p className="staff-form-error" role="alert">
    {Object.values(validationErrors).filter(Boolean).join(' ')}
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
            <th>
              <label htmlFor="staffId">コード *</label>
            </th>
            <td>
              <input
                id="staffId"
                name="staffId"
                type="text"
                value={formData.staffId}
                onChange={handleChange}
              />
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録'}
        </button>
      </div>
    </form>
  </section>
)
}

export default StaffCreatePage;
