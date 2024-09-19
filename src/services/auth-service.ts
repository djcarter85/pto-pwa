const isLoggedIn = () => {
  return !!localStorage.getItem("isLoggedIn");
};

const logIn = () => {
  localStorage.setItem("isLoggedIn", "true");
};

const logOut = () => {
  localStorage.removeItem("isLoggedIn");
};

export { isLoggedIn, logIn, logOut };
