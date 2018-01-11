import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { resolvers } from './resolvers';

const rootSchema = path.join(__dirname, 'schema.graphql');
const typeDefs = importSchema(rootSchema);

export default makeExecutableSchema({ typeDefs, resolvers });
