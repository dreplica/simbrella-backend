import { projectModel, userModel } from '../db/models';
import { ProjectInterface, UserInterface } from '../@types/models';
import { mongooseTransaction, setEmptyObjectValuesToNull } from '../utils/utils';
import { PROJECT_STATUS } from '../utils/constants';
import mongoose from 'mongoose';

const createProject = async (projectBody: ProjectInterface, userId: string) => {
  const payload: ProjectInterface = {
    title: projectBody.title,
    description: projectBody.description,
    creator: userId,
  };

  return await mongooseTransaction(async (session) => {
    const project = new projectModel(payload);
    await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { projects: project._id },
      },
      { session }
    );
    await project.save({ session });
    return { project };
  });
};

const getProject = async (projectId: string) => {
  const project = await projectModel.findById(projectId).lean();
  if (!project) {
    throw new Error(`project does not exist`);
  }
  return { project };
};

const getAllProject = async (id: string) => {
  const { projects } = (await userModel
    .findById(id, { projects: 1 })
    .populate('projects')
    .lean()) as UserInterface;

  if (!projects) {
    throw new Error(`No projects available`);
  }
  return { projects };
};

const deleteProject = async (projectId: string) => {
  return mongooseTransaction<Promise<ProjectInterface>>(
    async (session: mongoose.mongo.ClientSession) => {
      const project = await projectModel
        .findByIdAndDelete({ _id: projectId })
        .session(session)
        .lean();
      if (!project) {
        console.error(`project with id ${projectId} does not exist`);
        throw new Error(`project not found`);
      }
      await userModel.updateMany(
        { projects: projectId },
        { $pull: { projects: projectId } },
        { session }
      );
      return project;
    }
  );
};

const removeProjectUser = async (userId: string, projectId: string) => {
  const user = await userModel
    .findByIdAndUpdate({ _id: userId }, { $pull: { projects: projectId } })
    .lean();
  if (!user) {
    console.error(`User not on this project ${projectId}`);
    throw new Error(`project not found`);
  }
  return { user };
};

const updateProject = async (requestBodyPayload: ProjectInterface) => {
  const { status, description, title, taskId, id } = setEmptyObjectValuesToNull<
    ProjectInterface & { taskId?: string }
  >(requestBodyPayload);

  const project = await projectModel
    .findByIdAndUpdate(
      id,
      { status, description, title, $push: { tasks: taskId } },
      { new: true }
    )
    .lean();

  if (!project) {
    console.error(`project with id ${id} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

const addUserToProject = async (projectId: string, userId: string) => {
  const user = await userModel
    .findByIdAndUpdate(userId, { $push: { projects: projectId } }, { new: true })
    .lean();

  if (!user) {
    console.error(`User with id ${userId} does not exist`);
    throw new Error(`User not found`);
  }
  return { user };
};

const ProjectService = {
  getProject,
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
  removeProjectUser,
  addUserToProject,
};

export default ProjectService;
