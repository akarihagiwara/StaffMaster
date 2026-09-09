import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteStaff, getStaffById } from "../api/staffApi";

function StaffDetailPage() {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadStaff() {
      try {
        const data = await getStaffById(staffId);

        if (!isCancelled) {
          setStaff(data);
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(error.message);
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

  function handleRetry() {
    setStaff(null);
    setErrorMessage("");
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `${staff.staffName}さんを削除します。よろしいですか？`,
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

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (errorMessage) {
    return (
      <section>
        <h1>スタッフ詳細</h1>
        <p role="alert">{errorMessage}</p>
        <button type="button" onClick={handleRetry}>
          再読み込み
        </button>
        <p>
          <Link to="/staff">一覧へ戻る</Link>
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="page-heading">
        <h1>スタッフ詳細</h1>
        <div>
          <Link to={`/staff/${staff.staffId}/edit`}>編集</Link>
          {" / "}
          <button type="button" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "削除中..." : "削除"}
          </button>
          {" / "}
          <Link to="/staff">一覧へ戻る</Link>
        </div>
      </div>

      {deleteErrorMessage && <p role="alert">{deleteErrorMessage}</p>}

      <dl>
        <dt>スタッフID</dt>
        <dd>{staff.staffId}</dd>

        <dt>スタッフ名</dt>
        <dd>{staff.staffName}</dd>

        <dt>部署ID</dt>
        <dd>{staff.departmentId || "-"}</dd>

        <dt>役職ID</dt>
        <dd>{staff.positionId || "-"}</dd>

        <dt>メールアドレス</dt>
        <dd>{staff.email || "-"}</dd>

        <dt>ログインID</dt>
        <dd>{staff.loginId}</dd>
      </dl>
    </section>
  );
}

export default StaffDetailPage;
