import { USER } from "../models/users";

export function sanitizeUser(user: USER) {
  const { password, ...userInfo } = user;
  return userInfo;
}
