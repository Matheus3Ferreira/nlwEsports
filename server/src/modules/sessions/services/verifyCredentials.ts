import findUserByEmail from "../../users/services/findUserByEmail";
import { compare } from "bcrypt";

interface ICredentials {
  email: string;
  password: string;
}

export default async function verifyCredentials({
  email,
  password,
}: ICredentials) {
  const user = await findUserByEmail(email);
  if (!user) {
    return;
  }
  if (user.password) {
    const isValidPassword = await compare(password, user.password);

    return isValidPassword ? user : undefined;
  }
  return;
}
