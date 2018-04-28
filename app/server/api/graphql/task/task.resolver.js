import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from './alc.resovler';

const allTasks = createResolver((root, args, { models: { Task } }) => Task.find());

const createTask = isAuthenticatedResolver.createResolver(async (root, args, { models: { Project, Task }, user }) => {
  const task = new Task({ title: args.title });
  await task.save();
  const project = await Project.findById(args.projectID);

  project.tasks.push(task._id);
  await project.save();

  return task;
});

export default {
  Query: {
    allTasks,
  },
  Mutation: {
    createTask,
  },
  Task: {
    id: root => root._id.toString(),
  },
};
