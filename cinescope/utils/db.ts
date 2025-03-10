let users: { username: string; email: string; password: string; token: string }[] = [];

export const getUserData = async (token: string) => {
  const user = users.find((user) => user.token === token);
  return user || null;
};

export const saveUserData = async (username: string, email: string, password: string) => {
  const token = `${email}-token`; // Simple token generation for demonstration
  users.push({ username, email, password, token });
  return { token, username };
};

export const findUserByEmailAndPassword = async (email: string, password: string) => {
  const user = users.find((user) => user.email === email && user.password === password);
  return user || null;
};