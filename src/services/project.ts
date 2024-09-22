import { projectModel, userModel } from '../db/models';
import { ProjectInterface, UserInterface } from '../@types/models';
import { getProjectUsersWithTaskCount, mongooseTransaction, setEmptyObjectValuesToNull } from '../utils/utils';
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
  const project = await projectModel
    .findById(projectId)
    .populate([
      { path: 'tasks', populate: { path: 'creator', model: 'user', select: 'name' } },
      { path: 'creator', model: 'user', select: 'name' },
      { path: 'members', model: 'user', select: 'name role' },
    ])
    .lean()
    .exec();
  if (!project) {
    throw new Error(`project does not exist`);
  }
  return { project };
};

const getAllProject = async (id: string) => {
  const projects = await projectModel
    .find({ $or: [{ creator: id }, { members: { $in: [id] } }] })
    .populate([
      { path: 'members', select: 'name role' },
      { path: 'tasks', select: 'title description status' },
      { path: 'tasks.assignedTo', select: 'name' },
    ])
    .lean();

  if (!projects) {
    throw new Error(`No projects available`);
  }
  return { projects };
};

const deleteProject = async (projectId: string) => {
  return mongooseTransaction<Promise<ProjectInterface>>(async (session: mongoose.mongo.ClientSession) => {
    const project = await projectModel.findByIdAndDelete({ _id: projectId }).session(session).lean();
    if (!project) {
      console.error(`project with id ${projectId} does not exist`);
      throw new Error(`project not found`);
    }
    await userModel.updateMany({ projects: projectId }, { $pull: { projects: projectId } }, { session });
    return project;
  });
};

const removeProjectUser = async (userId: string, projectId: string) => {
  const project = await projectModel
    .findByIdAndUpdate(projectId, { $pull: { members: userId } }, { new: true })
    .populate([
      { path: 'members', select: 'name role _id' },
      { path: 'tasks' },
      { path: 'tasks.assignedTo', select: 'name' },
    ])
    .lean();
  if (!project) {
    throw new Error(`project/user not found`);
  }
  return { project };
};

const updateProject = async (requestBodyPayload: ProjectInterface) => {
  const {
    status,
    description,
    title,
    id,
    taskId: tasks,
    memberId: members,
  } = setEmptyObjectValuesToNull<ProjectInterface & { taskId?: string; memberId?: string }>(requestBodyPayload);

  const project = await projectModel
    .findByIdAndUpdate(id, { status, description, title, $addToSet: { tasks, members } }, { new: true })
    .populate([
      { path: 'members', select: 'name role _id' },
      { path: 'tasks' },
      { path: 'tasks.assignedTo', select: 'name' },
    ])
    .lean();

  if (!project) {
    console.error(`project with id ${id} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

const ProjectService = {
  getProject,
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
  removeProjectUser,
};

export default ProjectService;
