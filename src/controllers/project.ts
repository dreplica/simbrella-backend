import { Request, Response } from 'express';
import ProjectService from '../services/project';

const createProject = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const {project} = await ProjectService.createProject(req.body, userId);
    res.status(200).json({ data: project, success: true });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating Project',
      error: (error as Error).message,
    });
  }
};

const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { project } = await ProjectService.getProject(id);
    res.status(200).json({ data: project, success: true });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching Project',
      error: (error as Error).message,
    });
  }
};

const getAllProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { projects } = await ProjectService.getAllProject(id);
    res.status(200).json({ data: projects, success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Error fetching Project',
      error: (error as Error).message,
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const Project = await ProjectService.deleteProject(id);
    res.status(200).json({ data: Project, success: true });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ message: 'Error deleting Project', error: (error as Error).message }); // lets have a wrapper that returns error mesage
  }
};

const removeProjectUser = async (req: Request, res: Response) => {
  const { memberId, id: projectId } = req.body;
  try {
    const { project } = await ProjectService.removeProjectUser(memberId, projectId);
    res.status(200).json({ data: project, success: true });
  } catch (error) {
    console.error({ error });
    res.status(400).json({ message: 'Error deleting Project', error: (error as Error).message }); // lets have a wrapper that returns error mesage
  }
};

// project can update {name, email}
const updateProject = async (req: Request, res: Response) => {
  try {
    const { project } = await ProjectService.updateProject(req.body);
    res.status(201).json({ data: project, success: true });
  } catch (error) {
    res.status(400).json({ message: 'Error updating Project', error });
  }
};

const ProjectController = {
  getProject,
  getAllProject,
  createProject,
  deleteProject,
  updateProject,
  removeProjectUser,
};

export default ProjectController;
