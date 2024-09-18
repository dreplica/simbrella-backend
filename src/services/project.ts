import { projectModel } from "../db/models";
import { ProjectInterface } from "../types/models";
import { setEmptyObjectValuesToNull } from "../utils/utils";

export const getProjectService = async (projectId: string) => {
  const project = await projectModel.findOne({ _id: projectId }).lean();
  if (!project) {
    throw new Error(`project does not exist`);
  }
  return { project };
};

export const getAllProjectService = async () => {
  const projects = await projectModel.findOne().lean();
  if (!projects) {
    throw new Error(`No projects available`);
  }
  return { projects };
};

export const createProjectService = async (projectBody: ProjectInterface) => {
  const project = await projectModel.create(projectBody);

  return { project };
};

export const updateProjectService = async (projectBody: ProjectInterface) => {
  const nullifyData = setEmptyObjectValuesToNull<ProjectInterface>(projectBody);

  const project = await projectModel
    .findOneAndUpdate({ _id: nullifyData.id }, nullifyData)
    .lean();

  if (!project) {
    console.error(`project with id ${nullifyData} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

export const deleteProjectService = async (projectId: string) => {
  const project = await projectModel
    .findByIdAndDelete({ _id: projectId })
    .lean();
  if (!project) {
    console.error(`project with id ${projectId} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};

export const deleteProjectUserService = async (projectId: string) => {
  const project = await projectModel
    .findByIdAndDelete({ _id: projectId })
    .lean();
  if (!project) {
    console.error(`project with id ${projectId} does not exist`);
    throw new Error(`project not found`);
  }
  return { project };
};
