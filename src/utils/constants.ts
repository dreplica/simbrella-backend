// Db constants
export enum ROLES {
  ADMIN = "admin",
  MANAGER = "manager",
  MEMBER = "member",
}

export enum MODELS {
  USER = "user",
  PROJECT = "project",
  TASK = "task",
  TEAM = "team",
  NOTIFICATION = "notification",
  ERROR = "error",
}

export enum PROJECT_STATUS {
  COMPLETE = "complete",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum TASK_STATUS {
  TODO = "todo",
  INPROGRESS = "inprogress",
  DONE = "done",
}

export enum NOTIFICATION_STATUS {
  SEEN = "seen",
  UNSEEN = "unseen",
}

// Email constanst
export const LOGIN_EMAIL_SUBJECT = "EMAIL LOGIN CONFIRMATION LINK";
