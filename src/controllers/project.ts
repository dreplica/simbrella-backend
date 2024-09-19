import { Request, Response } from "express";
import ProjectService from "../services/project";

const getProject = async (req: Request, res: Response) => {
  const { id: projectId } = req.params;
  try {
    const { project } = await ProjectService.getProject(projectId);
    res.status(201).json({ data: project, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching Project",
      error: (error as Error).message,
    });
  }
};

const getAllProject = async (_req: Request, res: Response) => {
  try {
    const { projects } = await ProjectService.getAllProject();
    res.status(201).json({ data: projects, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching Project",
      error: (error as Error).message,
    });
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const Project = await ProjectService.createProject(req.body, userId);
    res.status(201).json({ data: Project, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating Project",
      error: (error as Error).message,
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { id: ProjectId, userId } = req.body;
  try {
    const Project = await ProjectService.deleteProject(ProjectId);
    // delete all project in user
    // delete all task in project
    // delete project
    res.status(201).json({ data: Project, ok: true });
  } catch (error) {
    console.error({ error });
    res
      .status(400)
      .json({ message: "Error deleting Project", error: error.message }); // lets have a wrapper that returns error mesage
  }
};

const deleteProjectUser = async (req: Request, res: Response) => {
  const { userId, projectId } = req.body;
  try {
    const Project = await ProjectService.deleteProjectUser({
      userId,
      projectId,
    });
    // remove user from project
    // on user model remove project from user
    // remove user from task
    res.status(201).json({ data: Project, ok: true });
  } catch (error) {
    console.error({ error });
    res
      .status(400)
      .json({ message: "Error deleting Project", error: error.message }); // lets have a wrapper that returns error mesage
  }
};

// project can update {name, email}
const updateProject = async (req: Request, res: Response) => {
  try {
    const { project } = await ProjectService.updateProject(req.body);
    res.status(201).json({ data: project, ok: true });
  } catch (error) {
    res.status(400).json({ message: "Error updating Project", error });
  }
};

const ProjectController = {
  getProject,
  getAllProject,
  createProject,
  deleteProject,
  deleteProjectUser,
  updateProject,
};

export default ProjectController;
