export const BASE_URL = "https://biyovo1194.pythonanywhere.com/api/v1/tasks";

export const api = {
  list: (page = 1) =>
    fetch(`${BASE_URL}/?page=${page}`).then((r) => r.json()),

  create: (body) =>
    fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  update: (id, body) =>
    fetch(`${BASE_URL}/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  patch: (id, body) =>
    fetch(`${BASE_URL}/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  delete: (id) =>
    fetch(`${BASE_URL}/${id}/`, { method: "DELETE" }).then((r) =>
      r.ok ? { success: true } : r.json()
    ),
};
