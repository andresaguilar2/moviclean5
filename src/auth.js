export function saveUser(name, email, password) {
  const user = `${name},${email},${password}`;
  let users = localStorage.getItem("users") || "";
  users += user + "\n";
  localStorage.setItem("users", users);
}

export function authenticate(email, password) {
  const users = (localStorage.getItem("users") || "").split("\n");
  for (let u of users) {
    const [name, mail, pass] = u.split(",");
  }
  return false;
}