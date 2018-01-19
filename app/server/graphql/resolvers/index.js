import { combineResolvers } from 'apollo-resolvers';

import User from './user.resolver';
import Project from './project.resolver';
import Auth from './auth.resolver';
import Task from './task.resolver';

export const resolvers = combineResolvers([Auth, User, Project, Task]);
