import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h1>ページが見つかりません</h1>
      <Link to="/staff">スタッフ一覧へ戻る</Link>
    </section>
  )
}

export default NotFoundPage