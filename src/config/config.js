const URLBASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

const ENDPOINT = {
  login: `${URLBASE}/users/login`,
  users: `${URLBASE}/users`,
  posts: `${URLBASE}/posts`,
  cart: `${URLBASE}/cart`,
};

export default { URLBASE, ENDPOINT };
