const user = 'gatsbyUser';

export const windowExists = () => typeof window !== 'undefined';
export const getUser = () =>
  windowExists() && window.localStorage.getItem(user) ? JSON.parse(window.localStorage.getItem(user)) : {};
const setUser = raw => window.localStorage.setItem(user, JSON.stringify(raw));

const users = {
  brekk: {
    username: 'brekk',
    name: 'Brekk Bockrath',
    email: 'brekk@brekkbockrath.com',
  },
};
export const handleLogin = ({ username, password }) => {
  if (!windowExists()) return false;
  if (username === `brekk` && password === `cool`) {
    setUser(users.brekk);
    return true;
  }
  return false;
};
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};
export const logout = callback => {
  setUser({});
  callback();
};
