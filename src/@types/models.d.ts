export interface ProjectInterface {
  id?: string
  title: string;
  description: string;
  creator: Schema.Types.ObjectId | string;
  tasks?: string[];
  teams?: string[];
  status: PROJECT_STATUS;
}

type CommentTypes = {
  user: Schema.Types.ObjectId | string;
  message: string;
};
export interface TaskInterface {
  id: string
  title: string;
  description: string;
  creator: Schema.Types.ObjectId | string;
  assigned: Schema.Types.ObjectId | string;
  user: Schema.Types.ObjectId | string;
  project: Schema.Types.ObjectId | string;
  comments: CommentTypes[];
  status: TASK_STATUS;
}

export interface UserInterface {
  id: string
  name: string;
  email: string;
  role: ROLES;
  token?: string;
  isDisabled?: boolean;
  notifications?: Schema.Types.ObjectId[] | string[];
  projects?: Schema.Types.ObjectId[] | string[];
}

export interface NotificationInterface {
  id: string
  to: Schema.Types.ObjectId | string;
  title: string;
  message: string;
  has_url: boolean;
  url: string;
  status: NOTIFICATION_STATUS;
}

export interface TeamsInterface {
  id: string
  creator: Schema.Types.ObjectId | string;
  name: string;
  slug: string;
  users: Schema.Types.ObjectId[] | string[];
  projects: Schema.Types.ObjectId[] | string[];
}
