import bcrypt from "bcryptjs";
import { RegisterInput } from "../models/register-input.model";
import prisma from "../docs/prisma-client";
import HttpException from "../models/http-exception.model";
import { RegisteredUser } from "../models/registered-user.model";
import generateToken from "../utils/token.utils";
import { Role, User } from "@prisma/client";

const checkUserUniqueness = async (name: string) => {
  let existingUserByName: { id: number } | null;
  existingUserByName = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByName) {
    throw new HttpException(422, {
      errors: {
        ...(existingUserByName ? { name: ["has already been taken"] } : {}),
      },
    });
  }
};

export const createUser = async (
  input: RegisterInput
): Promise<RegisteredUser> => {
  const name = input.name?.trim();
  const password = input.password?.trim();

  if (!name) {
    throw new HttpException(422, { errors: { name: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  await checkUserUniqueness(name);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      title: input.title,
      description: input.description,
      rate: input.rate,
      approved: false,
      role: Role[input.role as keyof typeof Role],
    },
    select: {
      name: true,
    },
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const login = async (userPayload: any) => {
  const name = userPayload.name?.trim();
  const password = userPayload.password?.trim();

  if (!name) {
    throw new HttpException(422, { errors: { name: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  const user = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      password: true,
      role: true,
      description: true,
      rate: true,
      title: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        rate: user.rate,
        description: user.description,
        title: user.title,
        token: generateToken(user),
      };
    }
  }

  throw new HttpException(403, {
    errors: {
      "name or password": ["is invalid"],
    },
  });
};

export const getCurrentUser = async (name: string) => {
  const user = (await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      password: true,
      description: true,
      title: true,
      rate: true,
      role: true,
    },
  })) as User;

  return {
    name: user.name,
    id: user.id,
    role: user.role,
    title: user.title,
    rate: user.rate,
    description: user.description,
    token: generateToken(user),
  };
};

export const updateUser = async (userPayload: User, newName: string) => {
  const { name, password, role, title, description, rate, approved } =
    userPayload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const currentUser = await getCurrentUser(name);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      ...(password ? { password: hashedPassword } : {}),
      ...(role ? { role } : {}),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(rate ? { rate: Number(rate) } : {}),
      ...(approved ? { approved } : {}),
    },
    select: {
      name: true,
      password: true,
      role: true,
      title: true,
      description: true,
      rate: true,
      approved: true,
    },
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const findUserIdByName = async (name: string) => {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new HttpException(404, {});
  }

  return user;
};

export const updateProfile = async (
  {
    title,
    description,
    rate,
  }: {
    title: string;
    description: string;
    rate: number;
  },
  name: string
) => {
  const currentUser = await getCurrentUser(name);

  const updatedUserInf = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(rate ? { rate: Number(rate) } : {}),
    },
    select: {
      title: true,
      description: true,
      rate: true,
    },
  });

  if (!updatedUserInf) {
    throw new HttpException(404, {});
  }

  return {
    ...updatedUserInf,
    token: generateToken(updatedUserInf),
  };
};
