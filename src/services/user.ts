import { projectModel, taskModel, userModel } from '../db/models';
import { UserInterface } from '../@types/models';
import { mongooseTransaction, setEmptyObjectValuesToNull } from '../utils/utils';

const getUser = async (userId: string) => {
  const user = await userModel.findOne({ _id: userId, isDisabled: false }).lean();

  if (!user) {
    throw new Error(`User does not exist`);
  }
  return { user };
};

const getAllUser = async () => {
  const users = await userModel.find().lean();
  if (!users) {
    throw new Error(`No users in management`);
  }
  return { users };
};

const createUser = async (userBody: Pick<UserInterface, 'name' | 'email' | 'role'>) => {
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

const updateUser = async (userBody: UserInterface) => {
  const nullifyEmptyData = setEmptyObjectValuesToNull<UserInterface>(userBody);
  const user = await userModel.findOneAndUpdate({ _id: nullifyEmptyData.id }, nullifyEmptyData).lean();

  if (!user) {
    console.error(`user with id ${nullifyEmptyData.id} does not exist`);
    throw new Error(`user not found`);
  }
  return { user };
};

const deleteUser = async (userId: string) => {
  return mongooseTransaction(async (session) => {
    const user = await userModel.findByIdAndDelete({ _id: userId }, { session }).lean();
    if (!user) {
      console.error(`user with id ${userId} does not exist`);
      throw new Error(`user not found`);
    }
    await projectModel.updateMany({members: userId}, {$pull: {members: userId}}, {session})
    await taskModel.updateMany({assignedTo: userId}, {$set: {assignedTo: null}}, {session})
    return { user };
  });
};

const userService = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
