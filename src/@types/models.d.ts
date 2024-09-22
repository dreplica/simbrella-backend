export interface ProjectInterface {
  id?: string;
  title: string;
  description: string;
  creator: Schema.Types.ObjectId | string;
  tasks?: string[];
  members?: string[];
  teams?: string[];
  status?: PROJECT_STATUS;
}

type CommentTypes = {
  user: Schema.Types.ObjectId | string;
  message: string;
};
export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  creator: Schema.Types.ObjectId | string;
  assignedTo: Schema.Types.ObjectId | string;
  comments: CommentTypes[];
  status: TASK_STATUS;
}

export interface UserInterface {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: ROLES;
  token?: string;
  isDisabled?: boolean;
  notifications?: Schema.Types.ObjectId[] | string[];
  projects?: Schema.Types.ObjectId[] | string[];
  tasks?: Schema.Types.ObjectId | string;
}

export interface NotificationInterface {
  id?: string;
  title: string;
  message: string;
  user: Schema.Types.ObjectId | string;
  has_url: boolean;
  url?: string;
  status?: NOTIFICATION_STATUS;
}

export interface TeamsInterface {
  id: string;
  creator: Schema.Types.ObjectId | string;
  name: string;
  slug: string;
  users: Schema.Types.ObjectId[] | string[];
  projects: Schema.Types.ObjectId[] | string[];
}

export type Realtime = {
  type: 'task' | '';
  operation: 'create' | 'delete' | 'update' | 'comment' | 'success';
  payload: {
    title?: string;
    description?: string;
    assignedTo?: string;
    projectId?: string;
    status?: string;
    message?: string;
    userId?: string;
    id: string;
  };
};
