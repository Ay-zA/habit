import _typeDefs from './schema/index.graphql';

export const typeDefs = _typeDefs; // Assign raw imported to the variable for Serverside HMR
export { formatError } from './errors';
export { resolvers } from './resolvers';
