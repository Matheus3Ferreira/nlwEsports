import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  phone?: string;
  whatsapp?: boolean;
  discordId?: string;
}

export default async function createUser(user: IUser) {
  const prisma = new PrismaClient();

  if (user.password) {
    user.password = await hash(user.password, 10);
  }

  const newUser = await prisma.user.create({
    data: user,
  });

  newUser.password = "";
  return newUser;
}
