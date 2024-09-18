import { userModel } from "../db/models";
import { UserInterface } from "../types/models";
import { setEmptyObjectValuesToNull } from "../utils/utils";

export const getUserService = async (userId: string) => {
  const user = await userModel
    .findOne({ _id: userId, isDisabled: false })
    .lean();

  if (!user) {
    throw new Error(`User does not exist`);
  }
  return { user };
};

export const getAllUserService = async () => {
  const users = await userModel.findOne({ isDisabled: false }).lean();
  if (!users) {
    throw new Error(`No users in management`);
  }
  return { users };
};

export const createUserService = async (
  userBody: Pick<UserInterface, "name" | "email" | "role">
) => {
  const { name, email, role } = userBody;

  const userExist = await userModel.findOne({ email }).lean();
  if (userExist) {
    throw new Error(`User already exist`);
  }

  const user = await userModel.create({
    name,
    email,
    role,
  });

  return { user };
};

export const updateUserService = async (userBody: UserInterface) => {
  const nullifyEmptyData = setEmptyObjectValuesToNull<UserInterface>(userBody);
  const user = await userModel
    .findOneAndUpdate({ _id: nullifyEmptyData.id }, nullifyEmptyData)
    .lean();

  if (!user) {
    console.error(`user with id ${nullifyEmptyData.id} does not exist`);
    throw new Error(`user not found`);
  }
  return { user };
};

export const deleteUserService = async (userId: string) => {
  const user = await userModel.findByIdAndDelete({ _id: userId }).lean();
  if (!user) {
    console.error(`user with id ${userId} does not exist`);
    throw new Error(`user not found`);
  }
  return { user };
};
