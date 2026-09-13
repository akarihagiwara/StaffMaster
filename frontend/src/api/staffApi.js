const API_BASE_URL = '/api'

async function request(url, options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    let message = '通信に失敗しました。'

    try {
      const errorData = await response.json()
      message = errorData.detail ?? errorData.message ?? message
    } catch {
      // JSON 形式のエラーでない場合は初期メッセージを使う
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getStaffList() {
  return request(`${API_BASE_URL}/staff`)
}

export async function getStaffById(staffId) {
  return request(`${API_BASE_URL}/staff/${staffId}`)
}

export async function createStaff(staffData) {
  return request(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
  })
}

export async function updateStaff(staffId, staffData) {
  return request(`${API_BASE_URL}/staff/${staffId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(staffData),
  })
}

export async function deleteStaff(staffId) {
  return request(`${API_BASE_URL}/staff/${staffId}`, {
    method: 'DELETE',
  })
}

export async function login(loginData) {
  return request(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
}

export async function logout() {
  return request(`${API_BASE_URL}/logout`, {
    method: 'POST',
  })
}
