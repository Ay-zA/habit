import fs from 'fs';
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

export default makeExecutableSchema({ typeDefs, resolvers });
