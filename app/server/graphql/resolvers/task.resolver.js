import { createResolver } from 'apollo-resolvers';

const allTasks = createResolver((root, args, { models: { Task } }) => Task.find());

const createTask = createResolver(async (root, args, { models: { Project, Task } }) => {
  const task = new Task({ title: args.title });
  await task.save();
  const project = await Project.findById(args.projectID);

  project.tasks.push(task._id);
  await project.save();

  return task;
});

export default {
  Query: {
    allTasks
  },
  Mutation: {
    createTask
  },
  Task: {
    id: root => root._id.toString()
  }
};
