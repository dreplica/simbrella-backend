import { Request, Response } from "express";
import {
  createProjectService,
  deleteProjectService,
  getAllProjectService,
  getProjectService,
  updateProjectService,
  deleteProjectUserService
} from "../services";

export const getProjectController = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const { project } = await getProjectService(projectId);
    res.status(201).json({ data: project, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching Project",
      error: (error as Error).message,
    });
  }
};

export const getAllProjectController = async (_req: Request, res: Response) => {
  try {
    const { projects } = await getAllProjectService();
    res.status(201).json({ data: projects, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching Project",
      error: (error as Error).message,
    });
  }
};

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const Project = await createProjectService(req.body);
    res.status(201).json({ data: Project, ok: true });
  } catch (error) {
    res.status(400).json({
      message: "Error creating Project",
      error: (error as Error).message,
    });
  }
};

export const deleteProjectController = async (req: Request, res: Response) => {
  const { ProjectId } = req.params;
  try {
    const Project = await deleteProjectService(ProjectId);
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

export const deleteProjectUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const Project = await deleteProjectUserService(userId);
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
export const updateProjectController = async (req: Request, res: Response) => {
  const { id, email, name, role } = req.body;
  try {
    const { Project } = await updateProjectService({ id, email, name, role });
    res.status(201).json({ data: Project, ok: true });
  } catch (error) {
    res.status(400).json({ message: "Error updating Project", error });
  }
};
