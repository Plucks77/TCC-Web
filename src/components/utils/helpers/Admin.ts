export function isLogged() {
  const token = localStorage.getItem("token");
  const admin_id = localStorage.getItem("admin_id");

  if (token && admin_id) {
    return true;
  } else {
    return false;
  }
}
