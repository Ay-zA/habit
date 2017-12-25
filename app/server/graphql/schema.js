import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} from 'graphql';
import { Project } from '@/api/entities/project';
import { Task } from '@/api/entities/task';

const TaskType = new GraphQLObjectType({
  name: 'Task',
  description: 'A Project Task',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    }
  }
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'A Habit Project',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of Project'
    },
    title: {
      type: GraphQLString,
      description: 'The title of Project (Uniqe)'
    },
    tasks: {
      type: GraphQLList(TaskType),
      resolve: async (context, args) => Project.getTasks(context.id)
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    projects: {
      type: GraphQLList(ProjectType),
      resolve: () => Project.list()
    },
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of project'
        }
      },
      resolve: (context, args) => Project.get(args.id)
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

export default schema;
