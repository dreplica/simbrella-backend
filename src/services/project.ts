import { projectModel, userModel } from "../db/models";
import { ProjectInterface } from "../@types/models";
import { setEmptyObjectValuesToNull } from "../utils/utils";
import { PROJECT_STATUS, ROLES } from "../utils/constants";

const getProject = async (projectId: string) => {
  const project = await projectModel.findOne({ _id: projectId }).lean();
  if (!project) {
    throw new Error(`project does not exist`);
  }
  return { project };
};

const getAllProject = async () => {
  const projects = await projectModel.find().lean();
  if (!projects) {
    throw new Error(`No projects available`);
  }
  return { projects };
};

const createProject = async (projectBody: ProjectInterface, userId: string) => {
  const populate: ProjectInterface = {
    title: projectBody.title,
    description: projectBody.description,
    creator: userId,
    status: PROJECT_STATUS["INACTIVE"],
  };
  const project = await projectModel.create(populate);
  return { project };
};

const updateProject = async (projectBody: ProjectInterface) => {
  const { tasks, teams, ...nullifyData } =
    setEmptyObjectValuesToNull<ProjectInterface>(projectBody);

  const project = await projectModel
    .findByIdAndUpdate(
      { _id: nullifyData.id },
      { ...nullifyData, $addToSet: { tasks, teams } },
      { new: true }
    )
    .lean();

  if (!project) {
    console.error(`project with id ${nullifyData} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

const deleteProject = async (projectId: string) => {
  const project = await projectModel
    .findByIdAndDelete({ _id: projectId })
    .lean();
  if (!project) {
    console.error(`project with id ${projectId} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

const deleteProjectUser = async ({ userId, projectId }) => {
  const user = await userModel
    .findByIdAndUpdate({ _id: userId }, { $pop: { projects: projectId } })
    .lean();
  const project = await projectModel
    .findByIdAndUpdate({ _id: projectId }, { $pop: { teams: userId } })
    .lean();
  if (!project) {
    console.error(`project with id ${projectId} does not exist`);
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
  deleteProjectUser,
};

export default ProjectService;
