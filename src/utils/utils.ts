import { USER } from "src/models/users";

export function sanitizeUser(user: USER) {
  const { password, ...userInfo } = user;
  return userInfo;
}
